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
import style from "../theme/style";
import { Colors } from "../theme/color";
import IntroItem from "../components/IntroItem/IntroItem";
import AppButton from "../components/AppButton/AppButton";
import { sliders } from "../constants/slidersConstant";
import {useTheme} from "../helper/themeProvider"

const width = Dimensions.get("screen").width;

const Sliders = () => {
  const ref = useRef(null);
  const router = useRouter();
  const { isDarkMode } = useTheme()
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
    <View style={{paddingHorizontal: 20,  paddingVertical: 20, backgroundColor: isDarkMode ? Colors.active : Colors.secondary }}>
      {/* Indicator Dots */}
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        {sliders.map((_, index) => (
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
      {currentSlideIndex === sliders.length - 1 && (
        <AppButton
          title="Get Started"
          onPress={() => router.push("/Authentication/Login")}
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
};

export default Sliders;

