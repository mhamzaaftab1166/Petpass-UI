import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useTheme } from "../../helper/themeProvider";
import { Colors } from "../../theme/color";

const NoItem = ({ title }) => {
  const { isDarkMode } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >
      <Image
        source={isDarkMode?require("../../../assets/images/no-item-white.png"):require("../../../assets/images/no-item.png")} 
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={[styles.text,{color: isDarkMode ? Colors.secondary : Colors.active }]}>Your {title} is empty</Text>
    </View>
  );
};

export default NoItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
