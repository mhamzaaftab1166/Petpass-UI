import { Stack } from "expo-router";
import { ThemeProvider } from './helper/themeProvider'; 

export default function RootLayout() {

  return (
    <ThemeProvider>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="Authentication/Sliders"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Authentication/Login"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Authentication/Signup"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Authentication/EmailVerify"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Authentication/ForgotPassword"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Authentication/NewPassword"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
    </Stack>
    </ThemeProvider>
  );
}
