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
import registerNNPushToken from "native-notify";
import notificationData from "../constants/notification";

const { width, height } = Dimensions.get("screen");

const Index = () => {
  registerNNPushToken(notificationData.appId, notificationData.appToken);
  const {
    homeData,
    loading,
    error,
    errorHomeVisible,
    fetchHomeData,
    clearHomeData,
  } = useHomeStore();
  const { isDarkMode } = useTheme();
  // const { token, handleLogout } = useAuthValidation();
  // const { showAlert } = useAlertStore();
  useFocusEffect(
    useCallback(() => {
      fetchHomeData();
      return () => clearHomeData();
    }, [])
  );

  return (
    <>
      {/* {showAlert && (
        <AppAlert
          showAlert={showAlert}
          title="Session Expired!"
          message="Your session has expired. Please log in again."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton
          confirmText="Got It"
          confirmButtonColor={Colors.primary}
          onConfirmPressed={handleLogout}
        />
      )} */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: 20,
          backgroundColor: isDarkMode ? Colors.dark : Colors.secondary,
        }}
      >
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <Banner />
        <Categories />
        <PetBanner />
        <View style={{ paddingBottom: "5%" }}>
          <RecentPets pets={homeData?.recent_pets} isLoading={loading} />
        </View>
        <View style={{ paddingBottom: "30%" }}>
          <PetTips tips={homeData?.pet_tips} loading={loading} />
        </View>
      </ScrollView>
    </>
  );
};

export default Index;
