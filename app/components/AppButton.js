import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

const AppButton = ({ title, onPress, style, parentStyle,paddingVertical=50 }) => {
  return (
    <View style={[{ paddingVertical: paddingVertical }, parentStyle]}>
      <TouchableOpacity onPress={onPress} style={style.btn}>
        <Text style={style.btntxt}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppButton;
