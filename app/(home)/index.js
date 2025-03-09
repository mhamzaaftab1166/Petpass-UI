import React from "react";
import { Dimensions, ScrollView, Platform } from "react-native";
import Banner from "../components/HomePage/Banner";
import Categories from "../components/HomePage/Categories";
import PetBanner from "../components/HomePage/PetBanner";
import RecentPets from "../components/HomePage/Recentpets";
import PetTips from "../components/HomePage/PetTips";
import { useTheme } from "../helper/themeProvider";
import { Colors } from "../theme/color";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const { width, height } = Dimensions.get("screen");

const Index = () => {
  const { isDarkMode } = useTheme();
  console.log(isDarkMode, "isDarkMode");

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: 20,
          backgroundColor: isDarkMode ? Colors.dark : Colors.secondary,
        }}
        contentContainerStyle={{
          height: Platform.OS === "ios" ? height * 1.25 : height * 2,
        }}
      >
        <Banner />
        <Categories />
        <PetBanner />
        <RecentPets />
        <PetTips />
      </ScrollView>
    </>
  );
};

export default Index;
