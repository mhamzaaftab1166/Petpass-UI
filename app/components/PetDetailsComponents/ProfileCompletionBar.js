import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../helper/themeProvider";
import style from "../../theme/style";
import { Colors } from "../../theme/color";

const ProfileCompletionBar = () => {
  const { isDarkMode } = useTheme();
  const progress = 75; // Dummy profile completion value
  const [containerWidth, setContainerWidth] = useState(0);
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const animatedCounter = useRef(new Animated.Value(0)).current;
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (containerWidth > 0) {
      Animated.timing(animatedWidth, {
        toValue: containerWidth * (progress / 100),
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  }, [containerWidth, progress, animatedWidth]);

  useEffect(() => {
    Animated.timing(animatedCounter, {
      toValue: progress,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    const listenerId = animatedCounter.addListener(({ value }) => {
      setCounter(Math.round(value));
    });

    return () => {
      animatedCounter.removeListener(listenerId);
    };
  }, [progress, animatedCounter]);

  const animatedTextColor = animatedWidth.interpolate({
    inputRange: [0, containerWidth / 2],
    outputRange: ["black", "white"],
    extrapolate: "clamp",
  });

  return (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginTop: 20,
      }}
    >
      <Text
        style={[
          style.s16,
          {
            color: isDarkMode ? Colors.secondary : Colors.active,
            fontFamily: "Avenir-Bold",
            marginBottom: 10,
          },
        ]}
      >
        {`Profile Completion ${counter}%`}
      </Text>
      <View
        style={[styles.progressBar, isDarkMode && styles.progressBarDark]}
        onLayout={(event) => {
          setContainerWidth(event.nativeEvent.layout.width);
        }}
      >
        <Animated.View
          style={[
            styles.progress,
            { width: animatedWidth },
            isDarkMode && styles.progressDark,
          ]}
        />
        <Animated.Text
          style={[styles.progressText, { color: animatedTextColor }]}
        >
          {`${counter}%`}
        </Animated.Text>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    width: "100%",
    height: 20,
    backgroundColor: Colors.light,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarDark: {
    backgroundColor: Colors.primary,
  },
  progress: {
    position: "absolute",
    left: 0,
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
  progressDark: {
    backgroundColor: Colors.primary,
  },
  progressText: {
    fontFamily: "Avenir-Bold",
    fontSize: 12,
  },
});

export default ProfileCompletionBar;
