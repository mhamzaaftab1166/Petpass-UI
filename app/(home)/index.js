
import React from "react";
import {
  Dimensions,
  ScrollView,
  Platform,
} from "react-native";
import Banner from "../components/HomePage/Banner";
import Categories from "../components/HomePage/Categories";
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';

const { width, height } = Dimensions.get("screen");

const Index = () => {
  return (
    <>
      <Banner />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 20 }}
        contentContainerStyle={{
          height: Platform.OS === "ios" ? height * 1.25 : height * 1.15,
        }}
      >
       <Categories/>
      </ScrollView>
    </>
  );
};

export default Index;
