import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { Colors } from "../theme/color";
import style from "../theme/style";
import Banner from "../components/HomePage/Banner";
import Categories from "../components/HomePage/Categories";
import { Stack } from "expo-router";
import PetBanner from "../components/HomePage/PetBanner";
import RecentPets from "../components/HomePage/recentpets";
import PetTips from "../components/HomePage/PetTips";
import { useTheme } from "../helper/themeProvider";

const { width, height } = Dimensions.get("screen");

const Index = () => {
    const { isDarkMode } = useTheme();
  console.log(isDarkMode, 'isDarkMode');
  
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 20, backgroundColor: isDarkMode ? Colors.dark : Colors.secondary }}
        contentContainerStyle={{
          height: Platform.OS === "ios" ? height * 1.25 : height * 2,
        }}
      >
      <Banner />
       <Categories/>
       <PetBanner />
       <RecentPets />
       <PetTips />
      </ScrollView>
    </>
  );
};

export default Index;
