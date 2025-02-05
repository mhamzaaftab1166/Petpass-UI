import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import RoleCard from "./RoleCard";

const AppRoleSelector = ({ value, onSelect, parentStyles }) => {
  const roles = [
    {
      title: "Owner",
      role:"pet_owner",
      imageSrc: require("../../assets/images/authentication/d3.png"),
    },
    {
      title: "Breeder",
      role:"pet_breeder",
      imageSrc: require("../../assets/images/authentication/breeder.png"),
    },
    {
      title: "Shop",
      role:"pet_shop",
      imageSrc: require("../../assets/images/authentication/d2.png"),
    },
  ];

  return (
    <View style={[styles.container, parentStyles]}>
      {roles.map((role, index) => (
        <RoleCard
          key={index}
          onPress={() => onSelect(role.role)}
          title={role.title}
          imageSrc={role.imageSrc}
          isSelected={value === role.role}
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
