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

const { width, height } = Dimensions.get("screen");

const Index = () => {
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 20 }}
        contentContainerStyle={{
          height: Platform.OS === "ios" ? height * 1.25 : height * 1.15,
        }}
      >
      <Banner />
       <Categories/>
       <PetBanner />
      </ScrollView>
    </>
  );
};

export default Index;
