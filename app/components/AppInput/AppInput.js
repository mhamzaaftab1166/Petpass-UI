import React, { useState } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../theme/color";
import Icon from "react-native-vector-icons/Ionicons";

const AppInput = ({
  placeholder,
  value,
  onChangeText,
  style,
  isPassword,
  parentStyles,
  ...otherProps
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <View style={[style.txtinput, { marginTop: 30 }, parentStyles]}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        selectionColor={Colors.primary}
        placeholderTextColor={Colors.lable}
        secureTextEntry={isPassword && !isPasswordVisible}
        style={[style.r16, { color: Colors.active, flex: 1 }]}
        {...otherProps}
      />
      {isPassword && (
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Icon
            name={isPasswordVisible ? "eye-off" : "eye"}
            color={Colors.disable}
            size={20}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({});
