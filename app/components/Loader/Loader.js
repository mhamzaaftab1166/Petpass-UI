import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";
import { Colors } from "../../theme/color";
import { useTheme } from "../../helper/themeProvider";

const Loader = ({ color = Colors.primary, size = "large", isLoad = false }) => {
  const { isDarkMode } = useTheme();
  return (
    isLoad && (
      <View style={styles.container}>
        <View style={[styles.loaderBox, {backgroundColor: isDarkMode ? Colors.active : Colors.secondary}]}>
          <ActivityIndicator size={size} color={color} />
        </View>
      </View>
    )
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  loaderBox: {
    width: 100,
    height: 100,
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
