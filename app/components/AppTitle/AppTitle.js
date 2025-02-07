import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AppTitle = ({ style, title }) => {
  return (
    <View>
      <Text style={[style.title, { marginTop: 50 }]}>{title}</Text>
    </View>
  );
};

export default AppTitle;

const styles = StyleSheet.create({});
