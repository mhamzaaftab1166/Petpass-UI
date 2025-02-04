import React, { useRef, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../theme/color";
import PhoneInput from "react-native-phone-input";

const AppPhoneInput = ({
  placeholder,
  value,
  onChangeText,
  style,
  parentStyles,
}) => {
  const phone = useRef(null);

  return (
    <View style={[style.txtinput, { marginTop: 30 }, parentStyles]}>
      <PhoneInput
        ref={phone}
        value={value}
        onChangePhoneNumber={onChangeText}
        initialCountry="ae"
        style={[style.r16, { color: Colors.active, flex: 1, paddingLeft: 10 }]}
        textProps={{
          placeholder: placeholder,
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default AppPhoneInput;

const styles = StyleSheet.create({});
