import React from "react";
import { StyleSheet } from "react-native";
import AppText from "../AppText";

function AppErrorMessage({ error, visible }) {
  return error && visible ? (
    <AppText style={styles.error}>{error}</AppText>
  ) : undefined;
}

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});

export default AppErrorMessage;
