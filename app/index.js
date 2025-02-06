import { Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import authServices from "./services/authService";
import HomeIndex from "./(home)/index";
import Sliders from "./Authentication/Sliders";
import { useUserStore } from "./store/useStore";

const width = Dimensions.get("screen").width;

export default function Introduction() {
  const { token, setToken } = useUserStore();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await authServices.getToken();
      setToken(token);
    };

    fetchToken();
  }, []);

  return token ? <HomeIndex /> : <Sliders />;
}
