import { Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [showSplashScreen, setshowSplashScreen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setshowSplashScreen(false);
    }, 4000);
  }, []);

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
        name="screens/EmailVerify"
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
}
