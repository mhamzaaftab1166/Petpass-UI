import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <Slot>
      <Stack>
        <Stack.Screen name="/index" options={{ headerShown: false }} />
        <Stack.Screen
          name="MyAccount/screens/Notifications"
          options={{ headerShown: false }}
        />
      </Stack>
    </Slot>
  );
};

export default ProfileLayout;
