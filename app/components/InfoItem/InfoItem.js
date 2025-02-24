import React from "react";
import { Text, View } from "react-native";
import { Colors } from "../../theme/color";
import { useTheme } from "../../helper/themeProvider";
 
const InfoItem = ({ label, value }) => {
  const { isDarkMode } = useTheme();
  return (
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      <Text
        style={{
          color: isDarkMode ? Colors.secondary : Colors.lable,
          fontFamily: "Avenir-SemiBold",
          fontSize: 14,
        }}
      >
        {label}:{" "}
      </Text>
      <Text
        style={{
          color: isDarkMode ? Colors.secondary : Colors.lable,
          fontFamily: "Avenir-Bold",
          fontSize: 15,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

export default InfoItem;
