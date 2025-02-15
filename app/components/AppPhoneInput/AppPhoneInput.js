import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import PhoneInput from "react-native-phone-input";
import { Colors } from "../../theme/color";
import { useTheme } from "../../helper/themeProvider";

const AppPhoneInput = ({
  placeholder,
  value,
  onChangeText,
  style,
  parentStyles,
}) => {
  const phone = useRef(null);
  const { isDarkMode } = useTheme();
  
  const handlePhoneChange = (number) => {
    if (phone.current) {
      const countryCode = "+" + phone.current.getCountryCode();
      const formattedNumber = number.replace(countryCode, "").trim();
      const finalNumber = `${countryCode} ${formattedNumber}`;
      onChangeText(finalNumber);
    }
  };

  return (
    <View style={[style.txtinput, { marginTop: 30 }, parentStyles]}>
      <PhoneInput
        ref={phone}
        value={value}
        onChangePhoneNumber={handlePhoneChange}
        initialCountry="ae"
        initialValue={value?value:null}
        textStyle={{color: isDarkMode ? Colors.secondary : Colors.active,fontFamily: "Avenir-Regular"}}
        style={[style.r16, { color:  isDarkMode ? Colors.secondary : Colors.active, flex: 1, paddingLeft: 10 }]}
        textProps={{
          placeholder: placeholder,
        }}
      />
    </View>
  );
};

export default AppPhoneInput;

const styles = StyleSheet.create({});
