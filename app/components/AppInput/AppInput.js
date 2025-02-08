import React, { useState } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../theme/color";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../helper/themeProvider";

const AppInput = ({
  placeholder,
  value,
  onChangeText,
  style,
  isPassword,
  parentStyles,
  ...otherProps
}) => {
    const { isDarkMode } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <View style={[style.txtinput, { marginTop: 30 }, parentStyles]}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        selectionColor={Colors.primary}
        placeholderTextColor={isDarkMode? Colors.secondary: Colors.lable}
        secureTextEntry={isPassword && !isPasswordVisible}
        style={[style.r16, { color: isDarkMode? Colors.secondary: Colors.active, flex: 1 }]}
        {...otherProps}
      />
      {isPassword && (
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Icon
            name={isPasswordVisible ? "eye-off" : "eye"}
            color={isDarkMode? Colors.secondary : Colors.disable}
            size={20}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({});
