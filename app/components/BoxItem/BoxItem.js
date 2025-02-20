import React from "react";
import { Text, View, StyleSheet } from "react-native";

const BoxItem = ({ label, value, bgColor, textColor }) => {
  return (
    <View style={[styles.box, { backgroundColor: bgColor }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: textColor }]}>{value}</Text>
    </View>
  );
};

export default BoxItem;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    height: 80,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
});
