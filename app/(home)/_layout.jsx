// app/(tabs)/_layout.js
import React, { useRef, useEffect } from "react";
import { Animated, View } from "react-native";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons"; // Import from Expo Vector Icons
import { Colors } from "../theme/color"; // Adjust the path as needed

// AnimatedTabIcon component: Adds a scale animation on the icon and a popping bubble effect behind it.
const AnimatedTabIcon = ({ focused, children }) => {
  const iconScale = useRef(new Animated.Value(1)).current;
  const bubbleScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (focused) {
      // When focused, animate both the icon scale and the background bubble.
      Animated.parallel([
        // Animate the icon to scale up
        Animated.spring(iconScale, {
          toValue: 1.3,
          friction: 4,
          useNativeDriver: true,
        }),
        // Animate a bubble pop: scale up quickly then back down.
        Animated.sequence([
          Animated.timing(bubbleScale, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(bubbleScale, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    } else {
      // When unfocused, animate the icon back to its original scale.
      Animated.spring(iconScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }).start();
    }
  }, [focused]);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Animated.View
        style={{
          position: "absolute",
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: Colors.primary,
          opacity: bubbleScale.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.3],
          }),
          transform: [{ scale: bubbleScale }],
        }}
      />
      <Animated.View style={{ transform: [{ scale: iconScale }] }}>
        {children}
      </Animated.View>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarActiveBackgroundColor: "#fafafa",
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          height: 65,
          elevation: 0,
          backgroundColor: "white",
          borderRadius: 16,
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabIcon focused={focused}>
              <MaterialCommunityIcons
                name="home-outline"
                size={28}
                color={focused ? color : Colors.lable}
              />
            </AnimatedTabIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="MyPets"
        options={{
          title: "My Pets",
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabIcon focused={focused}>
              <MaterialCommunityIcons
                name="layers-outline"
                size={28}
                color={focused ? color : Colors.lable}
              />
            </AnimatedTabIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="Add"
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <AnimatedTabIcon focused={focused}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: 56,
                  width: 56,
                  borderRadius: 999,
                  backgroundColor: Colors.primary,
                  marginBottom: 20,
                }}
              >
                <Ionicons name="add" size={24} color="white" />
              </View>
            </AnimatedTabIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="Map"
        options={{
          title: "Location",
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabIcon focused={focused}>
              <Feather
                name="map-pin"
                size={24}
                color={focused ? color : Colors.lable}
              />
            </AnimatedTabIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="MyAccount"
        options={{
          title: "Account",
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ focused, color }) => (
            <AnimatedTabIcon focused={focused}>
              <MaterialCommunityIcons
                name="account-outline"
                size={28}
                color={focused ? color : Colors.lable}
              />
            </AnimatedTabIcon>
          ),
        }}
      />
    </Tabs>
  );
}
