import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import storage from "../helper/localStorage";
import { useUserStore } from "../store/useStore";
import authService from "../services/authService";
import { localStorageConst } from "../constants/storageConstant";
import { useAlertStore } from "../store/useStore";

export default function useAuthValidation() {
  const router = useRouter();
  const { setShowAlert, showAlert } = useAlertStore();
  const [rememberMe, setRememberMe] = useState(false);
  const [refreshToken, setRefreshToken] = useState(null);
  const { token, clearUser, setToken } = useUserStore();

  const handleLogout = () => {
    setShowAlert(false);
    clearUser(); 
    router.replace("Authentication/Login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rememberem = await storage.getAppData(localStorageConst.REMEMBER);
        const refreshToken = await storage.getAppData(
          localStorageConst.REFRESHTOKEN
        );
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
        console.log("Checking token...",rememberMe);
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
                handleLogout();
              }
            } catch (refreshError) {
              console.log("Refresh token failed:", refreshError);
              handleLogout();
            }
          } else {
            console.log("Session expired. Logging out...");
            setShowAlert(true);
          }
        }
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 180000);

    return () => clearInterval(interval);
  }, [rememberMe, refreshToken]);

  return { token, handleLogout };
}
