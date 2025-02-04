import React from "react";
import { Text } from "react-native";
function AppText({ children = [], style = {}, ...otherProps }) {
  return (
    <Text {...otherProps} style={[ style]}>
      {children}
    </Text>
  );
}

export default AppText;
