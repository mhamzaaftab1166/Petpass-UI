import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
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
import ProfileCompletionBar from "../components/PetDetailsComponents/ProfileCompletionBar";
import { PetDetailSkeleton } from "../components/SkeletonCards/PetDetailSkeleton";
import * as MediaLibrary from "expo-media-library";
import ViewShot, { captureRef, captureScreen } from "react-native-view-shot";
import AppAlert from "../components/AppAlert/index";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function PetDetailPage() {
  const scrollViewRef = useRef();
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const { pet, loading, fetchPetById, fetchPublicPetById, clearPets } =
    usePetStore();
  const { id, userId, isPublic, home } = useLocalSearchParams();

  const { isDarkMode } = useTheme();
  const router = useRouter();

  const [showDownloadAlert, setShowDownloadAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showMessageAlert, setShowMessageAlert] = useState(false);

  useEffect(() => {
    if (status?.granted === false) {
      requestPermission();
    }
  }, [status]);

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
  const handleUpdate = () => {
    if (isPublic) {
      fetchPublicPetById(id, userId, { showLoading: false });
    } else {
      fetchPetById(id, { showLoading: false });
    }
  };

  const handleDownloadTrigger = () => {
    setShowDownloadAlert(true);
  };

  const onDownloadConfirm = async () => {
    setShowDownloadAlert(false);

    if (!scrollViewRef.current) {
      setAlertMessage("View reference not found");
      setShowMessageAlert(true);
      return;
    }
    try {
      const uri = await captureRef(scrollViewRef.current, {
        format: "jpeg",
        quality: 0.8,
      });
      console.log("Image saved to", uri);
      await MediaLibrary.createAssetAsync(uri);
      setAlertMessage("Image saved to your gallery!");
      setShowMessageAlert(true);
    } catch (error) {
      console.error("Snapshot failed", error);
      setAlertMessage("Snapshot failed. Please try again.");
      setShowMessageAlert(true);
    }
  };

  if (loading) return <PetDetailSkeleton />;

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
          <ViewShot captureMode="mount" ref={scrollViewRef}>
            <Banner
              pet={pet}
              router={router}
              isPublic={isPublic}
              onDownload={handleDownloadTrigger}
              home={home}
              onUpdate={handleUpdate}
              like={pet?.liked}
              superLike={pet?.super_liked}
              superLikeCount={pet?.super_liked_count}
              heartCount={pet?.liked_count}
            />
            <View
              style={[
                style.main,
                {
                  backgroundColor: isDarkMode
                    ? Colors.active
                    : Colors.secondary,
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
              <About pet={pet} router={router} isEdit={!isPublic} />
              <Description
                router={router}
                title="Description"
                pet={pet}
                isEdit={!isPublic}
              />
              <PhotoGallery
                isEdit={!isPublic}
                router={router}
                pet={pet}
                photos={pet?.pet_gallery?.images}
              />
              <VideoGallery
                isEdit={!isPublic}
                pet={pet}
                router={router}
                videos={pet?.pet_gallery?.video}
              />

              <VaccinationDetail pet={pet} router={router} isEdit={!isPublic} />

              {!isPublic && <Passport pet={pet} router={router} />}
            </View>
            {isPublic && <View style={{ marginBottom: 20 }}></View>}
          </ViewShot>
        </ScrollView>
      </View>

      {/* Custom Alert for Download Confirmation */}
      <AppAlert
        showAlert={showDownloadAlert}
        showProgress={false}
        title="Download"
        message="Are you sure you want to download pet detail screen?"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No"
        confirmText="Yes"
        confirmButtonColor={Colors.primary}
        onCancelPressed={() => setShowDownloadAlert(false)}
        onConfirmPressed={onDownloadConfirm}
      />
      <AppAlert
        showAlert={showMessageAlert}
        showProgress={false}
        title="Download"
        message={alertMessage}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Sure"
        confirmButtonColor={Colors.primary}
        onConfirmPressed={() => setShowMessageAlert(false)}
      />
    </SafeAreaView>
  );
}
