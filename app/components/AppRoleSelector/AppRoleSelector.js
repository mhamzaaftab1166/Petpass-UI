import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import RoleCard from "../RoleCard/RoleCard";

const AppRoleSelector = ({ roles=[], value, onSelect, parentStyles }) => {
  return (
    <View style={[styles.container, parentStyles]}>
      {roles.map((role, index) => (
        <RoleCard
          key={index}
          onPress={() => onSelect(role.role)}
          title={role.title}
          imageSrc={role.imageSrc}
          isSelected={value?.includes(role.role)}
        />
      ))}
    </View>
  );
};

export default AppRoleSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginTop: 20,
    gap: 10,
  },
});
