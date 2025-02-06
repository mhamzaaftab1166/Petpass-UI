import { Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import authServices from "./services/authService";
import HomeIndex from "./(home)/index";
import Sliders from "./Authentication/Sliders";

const width = Dimensions.get("screen").width;

export default function Introduction() {
  const [token, setToken] = useState();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await authServices.getToken();
      setToken(token);
      console.log(token, "tjdh");
    };

    fetchToken();
  }, []);

  return token ? <HomeIndex /> : <Sliders />;
}
