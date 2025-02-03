import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import { useRouter } from "expo-router";
import style from "./theme/style";
import { Colors } from "./theme/color";
import IntroItem from "./components/IntroItem";
import Slides from "./Constants/Slides";
import AppButton from "./components/AppButton";

const width = Dimensions.get("screen").width;

export default function Introduction() {
  const ref = useRef(null);
  const router = useRouter();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex < Slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const Footer = () => (
    <View style={{ paddingHorizontal: 20, backgroundColor: Colors.secondary }}>
      {/* Indicator Dots */}
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        {Slides.map((_, index) => (
          <View
            key={index}
            style={[
              style.indicator,
              currentSlideIndex === index && {
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

      {/* Continue Button */}
      <AppButton
        title="Continue"
        onPress={
          currentSlideIndex === Slides.length - 1
            ? () => router.push("/screens/Onboarding")
            : goNextSlide
        }
        style={style}
        paddingVertical={20}
      />
   
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={Slides}
        ref={ref}
        renderItem={({ item }) => <IntroItem item={item} />}
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
