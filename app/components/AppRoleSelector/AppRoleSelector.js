import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import RoleCard from "../RoleCard/RoleCard";
import owner from "../../../assets/images/authentication/d3.png";
import breeder from "../../../assets/images/authentication/breeder.png";
import shop from "../../../assets/images/authentication/d2.png";

const AppRoleSelector = ({ value, onSelect, parentStyles }) => {
  const roles = [
    {
      title: "Owner",
      role: "pet_owner",
      imageSrc: owner,
    },
    {
      title: "Breeder",
      role: "pet_breeder",
      imageSrc: breeder,
    },
    {
      title: "Shop",
      role: "pet_shop",
      imageSrc: shop,
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
          isSelected={value.includes(role.role)}
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
