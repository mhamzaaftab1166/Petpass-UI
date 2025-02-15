import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import AppText from "../AppText/AppText";
import { useTheme } from "../../helper/themeProvider";
import { Colors } from "../../theme/color";

function ItemPicker({ item, onPress }) {
  const { isDarkMode } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <AppText
        style={[
          styles.text,
          {
            color: isDarkMode ? Colors.secondary : Colors.active,
            fontFamily: "Avenir-Regular",
          },
        ]}
      >
        {item.label}
      </AppText>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});
export default ItemPicker;
