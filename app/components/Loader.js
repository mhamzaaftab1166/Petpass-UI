import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../theme/color";

const Loader = ({ color = Colors.primary, size = "large", isLoad = false }) => {
  return (
    isLoad && (
      <ActivityIndicator style={styles.loading} size={size} color={color} />
    )
  );
};

export default Loader;

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    zIndex: 1,
    opacity: 0.8,
  },
});
