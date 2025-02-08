import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../theme/color";
import { useTheme } from "../../helper/themeProvider";

const AppTitle = ({ style, title }) => {
  const { isDarkMode } = useTheme();
  return (
    <View>
      <Text style={[style.title, { marginTop: 50, color:  isDarkMode ? Colors.secondary : Colors.active}]}>{title}</Text>
    </View>
  );
};

export default AppTitle;

const styles = StyleSheet.create({});
