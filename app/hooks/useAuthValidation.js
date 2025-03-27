import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import storage from "../helper/localStorage";
import { useUserStore } from "../store/useStore";
import authService from "../services/authService";
import { localStorageConst } from "../constants/storageConstant";
import { useAlertStore } from "../store/useStore";
import { unregisterIndieDevice } from "native-notify";
import notificationData from "../constants/notification"

export default function useAuthValidation() {
  const router = useRouter();
  const { setShowAlert, showAlert } = useAlertStore();
  const [rememberMe, setRememberMe] = useState(false);
  const [refreshToken, setRefreshToken] = useState(null);
  const { user, token, clearUser, setToken, fetchUser } = useUserStore();
  const [startValidate, setStartValidate] = useState(false);

  const handleLogout = () => {
    unregisterIndieDevice(
      String(user?.id),
      notificationData.appId,
      notificationData.appToken
    );
    setShowAlert(false);
    clearUser();
    router.replace("Authentication/Login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rememberem = await storage.getAppData(localStorageConst.REMEMBER);
        const refreshToken = await storage.getAppData(
          localStorageConst.REFRESHTOKEN
        );
        setStartValidate(true);
        setRefreshToken(refreshToken);
        setRememberMe(rememberem);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      try {
        console.log("Checking token...", rememberMe);

        const isValid = await authService.validateToken();

        if (isValid.message === "Valid token") {
          setShowAlert(false);
        }
      } catch (error) {
        console.log("Error in checkToken:", error);
        if (error.message === "Token expired") {
          if (rememberMe) {
            try {
              console.log("Attempting to refresh token...");
              const data = await authService.refreshToken({ refreshToken });

              if (data?.accessToken) {
                console.log("Token refreshed successfully");
                await storage.storeAppData(
                  localStorageConst.JWTUSER,
                  data.accessToken
                );
                setToken(data.accessToken);
              } else {
                console.log("Failed to refresh token, logging out...");
                setShowAlert(true);
              }
            } catch (refreshError) {
              console.log("Refresh token failed:", refreshError);
              setShowAlert(true);
            }
          } else {
            console.log("Session expired. Logging out...");
            setShowAlert(true);
          }
        }
      }
    };
    if (startValidate) {
      checkToken();
    }
    const interval = setInterval(checkToken, 180000);

    return () => clearInterval(interval);
  }, [rememberMe, refreshToken]);

  return { token, handleLogout };
}
