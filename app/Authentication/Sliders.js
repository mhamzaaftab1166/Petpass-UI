import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { sliders } from "../constants/slidersConstant";
import IntroItem from "../components/IntroItem/IntroItem";
import AppButton from "../components/AppButton/AppButton";
import { Colors } from "../theme/color";
import { useTheme } from "../helper/themeProvider";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("screen");

export default function Sliders() {
  const listRef = useRef(null);
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSlider, setShowSlider] = useState(null);

  // Check if user has seen onboarding
  useEffect(() => {
    const checkOnboarding = async () => {
      console.log("called on boarding");
      try {
        const seen = await AsyncStorage.getItem("hasSeenOnboarding");
        /// on boarding call error
        // if (seen === "true") {
        //   setShowSlider(false);
        // } else {
        //   setShowSlider(true);
        // }
        router.replace("/Authentication/Login");
      } catch (err) {
        console.error("Error checking onboarding:", err);
        setShowSlider(true);
      }
    };
    checkOnboarding();
  }, [router]);

  // Prevent rendering until AsyncStorage check is complete
  if (showSlider === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const updateCurrentSlideIndex = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentSlideIndex(index);
  };

  const completeOnboarding = useCallback(async () => {
    try {
      await AsyncStorage.setItem("hasSeenOnboarding", "true");
      router.replace("/Authentication/Login");
    } catch (err) {
      console.error("Error completing onboarding:", err);
    }
  }, [router]);

  const renderFooter = () => (
    <View
      style={[
        styles.footerContainer,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >
      <View style={styles.indicatorContainer}>
        {sliders.map((_, i) => (
          <View
            key={i}
            style={[
              styles.indicator,
              currentSlideIndex === i && styles.activeIndicator,
            ]}
          />
        ))}
      </View>

      {currentSlideIndex === sliders.length - 1 && (
        <AppButton
          title="Get Started"
          onPress={completeOnboarding}
          style={styles.button}
          paddingVertical={10}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={sliders}
        ref={listRef}
        renderItem={({ item }) => (
          <IntroItem item={item} onSkip={completeOnboarding} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={updateCurrentSlideIndex}
      />
      {/* {renderFooter()} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeIndicator: {
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  button: {},
});