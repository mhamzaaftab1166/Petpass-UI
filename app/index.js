import { Dimensions, Platform } from "react-native";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import storage from "./helper/localStorage";
import Sliders from "./Authentication/Sliders";
import { useUserStore } from "./store/useStore";
import { Redirect, useFocusEffect, useRouter } from "expo-router";
import { localStorageConst } from "./constants/storageConstant";
import Loader from "./components/Loader/Loader";
import authService from "./services/authService";
import AppAlert from "./components/AppAlert";
import storeage from "./helper/localStorage";
import { Colors } from "./theme/color";

const width = Dimensions.get("screen").width;

export default function Introduction() {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const { token, refreshToken, rememberMe, clearUser, setToken } =
    useUserStore();
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

  const handleLogout = () => {
    clearUser();
    setShowAlert(false);
    router.replace("Authentication/Login");
  };

  useEffect(
    React.useCallback(() => {
      console.log("Screen is focused");

      const checkToken = async () => {
        try {
          console.log("Checking token...");
          const isValid = await authService.validateToken();
          console.log(isValid.message, "isValid");

          if (isValid.message === "Valid token") {
            setShowAlert(false);
          }
        } catch (error) {
          console.log(error);
          console.log("Error in checkToken:", error);

          if (error.message === "Token expired") {
            if (rememberMe) {
              try {
                console.log("Attempting to refresh token...");
                const data = await authService.refreshToken({
                  refreshToken: refreshToken,
                });

                if (data?.accessToken) {
                  console.log("Token refreshed successfully");
                  await storeage.storeAppData(
                    localStorageConst.JWTUSER,
                    data.accessToken
                  );

                  setToken(data.accessToken);
                } else {
                  console.log("Failed to refresh token, logging out...");
                    handleLogout();
                }
              } catch (refreshError) {
                console.log("Refresh token failed:", refreshError);
                  handleLogout();
              }
            } else {
              console.log("Session expired. Logging out...");
                handleLogout();
            }
          }
        }
      };

      checkToken();
      const interval = setInterval(checkToken, 3 * 60 * 1000);

      return () => {
        console.log("Screen is unfocused");
        clearInterval(interval);
      };
    }, [rememberMe, refreshToken])
  );

 

  console.log(
    refreshToken,
    "refreshToken",
    token,
    "token",
    rememberMe,
    "settokens"
  );

  console.log(showAlert, `showAlert on ${Platform.OS}`);
  

  if (showAlert) {
    return (
      <AppAlert
        showAlert={showAlert}
        title="Session Expired!"
        message="Your session has expired. Please log in again."
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton
        confirmText="Got It"
        confirmButtonColor={Colors.primary}
        onConfirmPressed={handleLogout}
      />
    );
  }

  if (!fontsLoaded) {
    return <Loader size="large" />;
  }

  return token && !showAlert ? <Redirect href="(home)" /> : <Sliders />;
}
