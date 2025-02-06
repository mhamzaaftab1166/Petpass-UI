import { Pressable, StyleSheet, Text, View } from "react-native";
import { useUserStore } from "../store/useStore";
import React from "react";
import { router, useRouter } from "expo-router";

const HomeIndex = () => {
  const { token, clearUser } = useUserStore();
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        clearUser();
        router.replace("/Authentication/Sliders");
      }}
    >
      <Text>{token}</Text>
    </Pressable>
  );
};

export default HomeIndex;

const styles = StyleSheet.create({});
