import { Dimensions } from "react-native";
import React, { useEffect } from "react";
import authServices from "./services/authService";
import Sliders from "./Authentication/Sliders";
import { useUserStore } from "./store/useStore";
import { Redirect } from "expo-router";

const width = Dimensions.get("screen").width;

export default function Introduction() {
  const { token, setToken } = useUserStore();

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await authServices.getToken();
      setToken(storedToken);
    };

    fetchToken();
  }, []);

  return token ? <Redirect href="(home)" /> : <Sliders />;
}
