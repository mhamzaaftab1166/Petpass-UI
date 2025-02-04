import React from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import style from "../theme/style";
import { Colors } from "../theme/color";

const { width, height } = Dimensions.get("screen");

export default function RoleCard({ title, imageSrc, onPress, isSelected }) {
  return (
    <View
      style={[
        style.shadow,
        {
          justifyContent: "center",
          alignItems: "center",
          height: height / 10,
          flex: 1,
          borderRadius: 10,
          borderWidth: isSelected ? 2 : 0, // Apply border only if selected
          borderColor: isSelected ? Colors.primary : "transparent",
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <Image
          source={imageSrc}
          resizeMode="contain"
          style={{ width: width / 10, height: height / 20 }}
        />
        <Text
          style={[style.s16, { color: Colors.disable, textAlign: "center" }]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
