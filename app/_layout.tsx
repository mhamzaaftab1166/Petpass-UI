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
        name="screens/Onboarding"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="screens/Login" options={{ headerShown: false }} />
      <Stack.Screen name="screens/Signup" options={{ headerShown: false }} />
      <Stack.Screen name="screens/Verify2" options={{ headerShown: false }} />
    </Stack>
  );
}
