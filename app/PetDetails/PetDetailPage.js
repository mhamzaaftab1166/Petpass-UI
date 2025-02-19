import { Dimensions, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import style from "../theme/style";
import { Colors } from "../theme/color";
import Banner from "../components/PetDetailsComponents/Banner";
import Description from "../components/PetDetailsComponents/Description";
import { useTheme } from "../helper/themeProvider";
import Bio from "../components/PetDetailsComponents/Bio";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function PetDetailPage() {
    const { isDarkMode } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[style.area, {  backgroundColor: isDarkMode ? Colors.active : Colors.secondary, }]}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Banner router={router} />
      <View
        style={[
          style.main,
          {   backgroundColor: isDarkMode ? Colors.active : Colors.secondary, marginTop: 10 },
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Bio/>
          <Description
            router={router}
            title="Description"
            text={
              "Lorem ipsum dolor sit amet, consectetur pisicing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua."
            }
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
