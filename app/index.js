import { Dimensions } from "react-native";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import storage from "./helper/localStorage";
import Sliders from "./Authentication/Sliders";
import { Redirect } from "expo-router";
import { localStorageConst } from "./constants/storageConstant";
import Loader from "./components/Loader/Loader";
import useAuthValidation from "./hooks/useAuthValidation";
import { useUserStore } from "./store/useStore";
import AppAlert from "./components/AppAlert";
import { Colors } from "./theme/color";

const width = Dimensions.get("screen").width;

export default function Introduction() {
  const {  token } = useAuthValidation();
  const { setToken } = useUserStore();

  const [fontsLoaded] = useFonts({
    "Avenir-Regular": require("../assets/fonts/AvenirLTStd-Roman.otf"),
    "Avenir-SemiBold": require("../assets/fonts/AvenirLTStd-Medium.otf"),
    "Avenir-Bold": require("../assets/fonts/AvenirLTStd-Black.otf"),
    "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-SemiBold": require("../assets/fonts/OpenSans-Semibold.ttf"),
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await storage.getAppData(localStorageConst.JWTUSER);
      setToken(storedToken);
    };
    fetchToken();
  }, []);

  if (!fontsLoaded) {
    return <Loader size="large" />;
  }

  return (
    <>
      {token ? <Redirect href="(home)" /> : <Sliders />}
    </>
  );
}
