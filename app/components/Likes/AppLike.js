import React, { useState, useRef, useEffect } from "react";
import {
  TouchableOpacity,
  Animated,
  StyleSheet,
  View,
  Text,
  Easing,
} from "react-native";
import {
  Ionicons,
  Entypo,
  MaterialIcons,
  FontAwesome6,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

const ICONS = {
  FontAwesome,
  FontAwesome6,
  MaterialIcons,
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
};

const AppIcon = ({
  type = "FontAwesome",
  name,
  size = 24,
  color = "black",
  activeColor = "red",
  onPress,
  style,
  variant,
  alreadyActive = false,
}) => {
  const IconComponent = ICONS[type];
  // Initialize the state with alreadyActive, and update when it changes.
  const [isPressed, setIsPressed] = useState(alreadyActive);
  const starAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setIsPressed(alreadyActive);
  }, [alreadyActive]);

  const animateStar = () => {
    starAnim.setValue(0);
    Animated.timing(starAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (!isPressed && variant === "superlike") {
      animateStar();
    }
    // Toggle state locally, and let the parent know via onPress callback.
    setIsPressed(!isPressed);
    if (onPress) onPress();
  };

  const getStarStyle = (x, y, delay) => ({
    opacity: starAnim.interpolate({
      inputRange: [0, 0.6, 1],
      outputRange: [0, 1, 0],
    }),
    transform: [
      {
        translateX: starAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, x],
        }),
      },
      {
        translateY: starAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, y],
        }),
      },
      {
        scale: starAnim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.3, 1.4, 0.5],
        }),
      },
      {
        rotate: starAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  });

  if (!IconComponent) {
    console.warn(`Icon type "${type}" is not supported.`);
    return null;
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.6}>
      <View style={styles.iconContainer}>
        <IconComponent
          name={name}
          size={size}
          color={isPressed ? activeColor : color}
          style={style}
        />
        {variant === "superlike" && (
          <>
            {[
              [-30, -30],
              [30, -30],
              [-25, 25],
              [25, 25],
              [0, -40],
            ].map(([x, y], index) => (
              <Animated.View
                key={index}
                style={[styles.starOverlay, getStarStyle(x, y, index * 100)]}
              >
                <Text style={styles.starText}>♥️</Text>
              </Animated.View>
            ))}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  starOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  starText: {
    fontSize: 16,
  },
});

export default AppIcon;
