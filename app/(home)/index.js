import React, { useCallback } from "react";
import { Dimensions, ScrollView, StatusBar, View } from "react-native";
import Banner from "../components/HomePage/Banner";
import Categories from "../components/HomePage/Categories";
import PetBanner from "../components/HomePage/PetBanner";
import RecentPets from "../components/HomePage/Recentpets";
import PetTips from "../components/HomePage/PetTips";
import { useTheme } from "../helper/themeProvider";
import { Colors } from "../theme/color";
import "react-native-get-random-values";
import { useHomeStore } from "../store/useStore";
import { useFocusEffect } from "expo-router";
import Loader from "../components/Loader/Loader";

const { width, height } = Dimensions.get("screen");

const Index = () => {
  const {
    homeData,
    loading,
    error,
    errorHomeVisible,
    fetchHomeData,
    clearHomeData,
  } = useHomeStore();
  const { isDarkMode } = useTheme();

  useFocusEffect(
    useCallback(() => {
      fetchHomeData();
      return () => clearHomeData();
    }, [])
  );

  if (loading) return <Loader isLoad={loading} />;
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: 20,
          backgroundColor: isDarkMode ? Colors.dark : Colors.secondary,
        }}
      >
        <Loader isLoad={loading} />
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <Banner />
        <Categories />
        <PetBanner />
        <RecentPets />
        <View style={{ paddingBottom: "30%" }}>
          <PetTips tips={homeData?.pet_tips} />
        </View>
      </ScrollView>
    </>
  );
};

export default Index;
