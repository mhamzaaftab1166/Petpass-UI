import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, SafeAreaView, FlatList, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { sliders } from "../constants/slidersConstant";
import IntroItem from "../components/IntroItem/IntroItem";
import AppButton from "../components/AppButton/AppButton";
import style from "../theme/style";
import { Colors } from "../theme/color";
import { useTheme } from "../helper/themeProvider";

const { width } = Dimensions.get("screen");

export default function Sliders() {
  const listRef = useRef(null);
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSlider, setShowSlider] = useState(null);

  useEffect(() => {
    async function checkOnboarding() {
      try {
        const seen = await AsyncStorage.getItem("hasSeenOnboarding");
        if (seen === "true") {
          setShowSlider(false);
          router.replace("/Authentication/Login");
        } else {
          setShowSlider(true);
        }
      } catch (err) {
        console.error(err);
        setShowSlider(true);
      }
    }
    checkOnboarding();
  }, [router]);

  if (showSlider === null) return null;

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
      console.error(err);
    }
  }, [router]);

  const Footer = () => (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: isDarkMode ? Colors.active : Colors.secondary,
      }}
    >
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        {sliders.map((_, i) => (
          <View
            key={i}
            style={[
              style.indicator,
              currentSlideIndex === i && {
                borderColor: Colors.primary,
                borderWidth: 1,
                paddingHorizontal: 12,
                borderRadius: 10,
                backgroundColor: Colors.primary,
                alignItems: "center",
              },
            ]}
          />
        ))}
      </View>

      {currentSlideIndex === sliders.length - 1 && (
        <AppButton
          title="Get Started"
          onPress={completeOnboarding}
          style={style}
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
      <Footer />
    </SafeAreaView>
  );
}
