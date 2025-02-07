import React from "react";
import { StyleSheet } from "react-native";
import AppText from "../AppText/AppText";

function AppErrorMessage({ error, visible }) {
  return error && visible ? (
    <AppText style={styles.error}>{error}</AppText>
  ) : undefined;
}

const styles = StyleSheet.create({
  error: {
    marginTop: 10,
    color: "red",
    fontFamily: "Avenir-Bold"
  },
});

export default AppErrorMessage;
