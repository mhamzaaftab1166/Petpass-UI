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
  editable = true,
  multiline = false,
  numberOfLines = 4,
  ...otherProps
}) => {
  const { isDarkMode } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <View
      style={[
        multiline ? styles.inputContainer : style.txtinput,
        {
          marginTop: 30,
          backgroundColor:
            editable === true ? "" : isDarkMode ? Colors.disable : Colors.light,
        },
        parentStyles,
      ]}
    >
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        selectionColor={Colors.primary}
        editable={editable}
        placeholderTextColor={isDarkMode ? Colors.secondary : Colors.lable}
        secureTextEntry={isPassword && !isPasswordVisible}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? "top" : "center"}
        style={[
          multiline ? styles.input : style.r16,
          {
            color: isDarkMode ? Colors.secondary : Colors.active,
            height: multiline ? 100 : 50,
            flex: 1,
          },
        ]}
        {...otherProps}
      />
      {isPassword && (
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Icon
            name={isPasswordVisible ? "eye-off" : "eye"}
            color={isDarkMode ? Colors.secondary : Colors.disable}
            size={20}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: Colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 2
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.active,
    fontFamily: "OpenSans-Regular"
  },
});