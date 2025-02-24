import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
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
import VaccinationDetail from "../components/PetDetailsComponents/VaccinationDetail";
import { usePetStore } from "../store/useStore";
import Loader from "../components/Loader/Loader";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function PetDetailPage() {
  const {
    pet,
    loading,
    fetchPetById,
    singlePetError,
    singlePetErrorVisible,
    clearPets,
  } = usePetStore();
  const { id } = useLocalSearchParams();

  const { isDarkMode } = useTheme();
  const router = useRouter();
console.log(pet,"jj");

  useFocusEffect(
    useCallback(() => {
      fetchPetById(id);
      return () => clearPets();
    }, [id])
  );

  return (
    <SafeAreaView
      style={[
        style.area,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >
      <Loader isLoad={loading} />

      <StatusBar backgroundColor="transparent" translucent={true} />
      <Banner profileImg={pet?.pet_profile_picture} router={router} />
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
          <Bio pet={pet} router={router} />
          <About pet={pet} router={router} />
          <Description router={router} title="Description" pet={pet} />
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
          <VaccinationDetail pet={pet} router={router} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
