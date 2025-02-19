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
        <Stack.Screen
          name="MyAccount/screens/ProfileInfo"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyAccount/screens/Addresses"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyAccount/screens/AddressFrom"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyAccount/screens/Settings"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyAccount/screens/Security"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyAccount/screens/EditPassword"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyAccount/screens/EditEmail"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyAccount/screens/MyPets"
          options={{ headerShown: false }}
        /> 
      </Stack>
    </Slot>
  );
};

export default ProfileLayout;
