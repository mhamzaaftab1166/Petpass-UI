import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import style from "../theme/style";
import { Colors } from "../theme/color";
import Banner from "../components/PetDetailsComponents/Banner";
import Description from "../components/PetDetailsComponents/Description";
import { useTheme } from "../helper/themeProvider";
import Bio from "../components/PetDetailsComponents/Bio";
import About from "../components/PetDetailsComponents/About";
import PhotoGallery from "../components/PetDetailsComponents/PetGallery";
import p1 from "../../assets/images/p1.png";
import p2 from "../../assets/images/p2.png";
import p3 from "../../assets/images/p3.png";
import p4 from "../../assets/images/p1.png";
import p5 from "../../assets/images/p1.png";
import VideoGallery from "../components/PetDetailsComponents/VideosGallery";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function PetDetailPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView
      style={[
        style.area,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Banner router={router} />
      <View
        style={[
          style.main,
          {
            backgroundColor: isDarkMode ? Colors.active : Colors.secondary,
            marginTop: 10,
          },
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Bio router={router} />
          <About router={router} />
          <Description
            router={router}
            title="Description"
            text={
              "Lorem ipsum dolor sit amet, consectetur pisicing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua."
            }
          />
          <PhotoGallery router={router} photos={[p1, p2, p3, p4, p5]} />
          <VideoGallery
            router={router}
            videos={[
              "https://www.w3schools.com/html/mov_bbb.mp4",
              "https://www.w3schools.com/html/mov_bbb.mp4",
              "https://www.w3schools.com/html/mov_bbb.mp4",
              "https://www.w3schools.com/html/mov_bbb.mp4",
              "https://www.w3schools.com/html/mov_bbb.mp4",
            ]}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
