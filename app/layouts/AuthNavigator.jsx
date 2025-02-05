import { Stack } from "expo-router";
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AuthNavigator = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="screens/Authentication/Onboarding"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="screens/Authentication/Login"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="screens/Authentication/Signup"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="screens/Authentication/EmailVerify"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="screens/Authentication/ForgotPassword"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="screens/Authentication/NewPassword"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default AuthNavigator;

const styles = StyleSheet.create({})