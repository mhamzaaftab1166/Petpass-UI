import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useUserStore } from "../store/useStore";
import React from 'react'

const HomeIndex = () => {
  const { token, clearUser } = useUserStore();

  return (
    <Pressable onPress={() => clearUser(null)}>
      <Text>{token}</Text>
    </Pressable>
  );
}

export default HomeIndex;

const styles = StyleSheet.create({})