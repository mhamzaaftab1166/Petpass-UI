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
import { PetDetailSkeleton } from "../components/SkeletonCards/PetDetailSkeleton";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function PetDetailPage() {
  const {
    pet,
    loading,
    fetchPetById,
    fetchPublicPetById,
    singlePetError,
    singlePetErrorVisible,
    clearPets,
  } = usePetStore();
  const { id, userId, isPublic } = useLocalSearchParams();

  const { isDarkMode } = useTheme();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      if (isPublic) {
        fetchPublicPetById(id, userId);
      } else {
        fetchPetById(id);
      }
      return () => clearPets();
    }, [id])
  );

  const handleDownlaod=()=>{

  }

  if (loading) return (
    <PetDetailSkeleton />
  );

  return (
    <SafeAreaView
      style={[
        style.area,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >

      <StatusBar backgroundColor="transparent" translucent={true} />
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Banner profileImg={pet?.pet_profile_picture} router={router} isPublic={isPublic} onDownload={handleDownlaod} />
          <View
            style={[
              style.main,
              {
                backgroundColor: isDarkMode ? Colors.active : Colors.secondary,
                marginTop: isPublic ? 0 : 10,
              },
            ]}
          >
            {!isPublic && (
              <ProfileCompletionBar
                router={router}
                pet={pet}
                value={pet?.pet_profile_completeion}
              />
            )}
            <View
              style={[
                style.divider,
                { marginTop: isPublic ? 0 : 20, marginBottom: 10 },
              ]}
            ></View>
            <Bio pet={pet} router={router} />
            <About pet={pet} router={router} isEdit={isPublic ? false : true} />
            <Description
              router={router}
              title="Description"
              pet={pet}
              isEdit={isPublic ? false : true}
            />
            <PhotoGallery
              isEdit={isPublic ? false : true}
              router={router}
              pet={pet}
              photos={pet?.pet_gallery?.images}
            />
            <VideoGallery
              isEdit={isPublic ? false : true}
              pet={pet}
              router={router}
              videos={pet?.pet_gallery?.video}
            />
            {!isPublic && (
              <VaccinationDetail
                pet={pet}
                router={router}
                isEdit={isPublic ? false : true}
              />
            )}
            {!isPublic && <Passport pet={pet} router={router} />}
          </View>
          {isPublic && <View style={{ marginBottom: 20 }}></View>}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
