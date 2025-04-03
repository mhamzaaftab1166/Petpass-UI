import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useCallback, useState } from "react";
import style from "../theme/style";
import { Colors } from "../theme/color";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import { useTheme } from "../helper/themeProvider";
import { router, useFocusEffect } from "expo-router";
import homeService from "../services/homeService";
import Loader from "../components/Loader/Loader";
import AppSkeleton from "../components/AppSkeleton";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function PetListing() {
  const { isDarkMode } = useTheme();

  useFocusEffect(
    useCallback(() => {
    //   const fetchTips = async () => {
    //     try {
    //       setLoading(true);
    //       setError(null);
    //       const data = await homeService.getTips();
    //       setTips(data);
    //     } catch (err) {
    //       setError(err.message);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    //   fetchTips();
    }, [])
  );

  return (
    <SafeAreaView
      style={[
        style.area,
        { backgroundColor: isDarkMode ? Colors.dark : Colors.secondary },
      ]}
    >
      <View
        style={[
          style.main,
          { backgroundColor: isDarkMode ? Colors.dark : Colors.secondary },
        ]}
      >
        <AppBar
          color={isDarkMode ? Colors.active : Colors.secondary}
          titleStyle={[
            style.apptitle,
            {
              color: isDarkMode ? Colors.secondary : Colors.active,
              fontFamily: "Avenir-Bold",
            },
          ]}
          centerTitle={true}
          elevation={0}
          title="My Pets Vaccinations"
          leading={
            <TouchableOpacity onPress={() => router.back()}>
              <Icon
                name="chevron-back"
                color={isDarkMode ? Colors.secondary : Colors.active}
                size={30}
              />
            </TouchableOpacity>
          }
        />
      </View>
    </SafeAreaView>
  );
}
