import { ActivityIndicator, Dimensions, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import storage from "./helper/localStorage";
import Sliders from "./Authentication/Sliders";
import { useUserStore } from "./store/useStore";
import { Redirect } from "expo-router";
import { localStorageConst } from "./constants/storageConstant";

const width = Dimensions.get("screen").width;

export default function Introduction() {
  const { token, setToken } = useUserStore();
  const [fontsLoaded] = useFonts({
    "Avenir-Regular": require("../assets/fonts/AvenirLTStd-Roman.otf"),
    "Avenir-SemiBold": require("../assets/fonts/AvenirLTStd-Medium.otf"),
    "Avenir-Bold": require("../assets/fonts/AvenirLTStd-Black.otf"),
    "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-SemiBold": require("../assets/fonts/OpenSans-Semibold.ttf"),
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
  });

  const colorScheme = useColorScheme(); // Get system theme (dark or light)
  const isDarkMode = colorScheme === "dark";

  useEffect(() => {
    storage.storeAppData(localStorageConst.THEME, isDarkMode ? "dark" : "light")
    const fetchToken = async () => {
      const storedToken = await storage.getAppData(localStorageConst.JWTUSER);
      setToken(storedToken);
    };

    fetchToken();
  }, []);

  console.log(token);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={isDarkMode ? "#FFF" : "#000"} />;
  }

  return token ? <Redirect href="(home)" /> : <Sliders theme={isDarkMode ? "dark" : "light"} />;
}
