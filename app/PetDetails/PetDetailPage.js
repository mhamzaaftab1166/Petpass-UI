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
import VideoGallery from "../components/PetDetailsComponents/VideosGallery";
import VaccinationDetail from "../components/PetDetailsComponents/VaccinationDetail";
import { usePetStore } from "../store/useStore";
import Loader from "../components/Loader/Loader";
import Passport from "../components/PetDetailsComponents/Passport";
import { isLoading } from "expo-font";
import ProfileCompletionBar from "../components/PetDetailsComponents/ProfileCompletionBar";

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

  useFocusEffect(
    useCallback(() => {
      fetchPetById(id);
      return () => clearPets();
    }, [id])
  );

  if (loading) return <Loader isLoad={loading} />;
  return (
    <SafeAreaView
      style={[
        style.area,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >
      <Loader isLoad={loading} />

      <StatusBar backgroundColor="transparent" translucent={true} />
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
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
            <ProfileCompletionBar router={router} pet={pet} />
             <View style={[style.divider, { marginTop: 20,marginBottom:10 }]}></View>
            <Bio pet={pet} router={router} />
            <About pet={pet} router={router} />
            <Description router={router} title="Description" pet={pet} />
            <PhotoGallery
              router={router}
              pet={pet}
              photos={pet?.pet_gallery?.images}
            />
            <VideoGallery
              pet={pet}
              router={router}
              videos={pet?.pet_gallery?.video}
            />
            <VaccinationDetail pet={pet} router={router} />
            <Passport pet={pet} router={router} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
