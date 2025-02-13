// app/(tabs)/_layout.js

import React, { useRef, useEffect, useState } from "react";
import { Animated, View } from "react-native";
import { Tabs, useFocusEffect, useRouter } from "expo-router";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { Colors } from "../theme/color";
import { useTheme } from "../helper/themeProvider";
import authService from "../services/authService";
import AppAlert  from "../components/AppAlert"
import useUserStore from "../store/useUserStore"

const AnimatedTabIcon = ({ focused, children }) => {
  const iconScale = useRef(new Animated.Value(1)).current;
  const bubbleScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (focused) {
      Animated.parallel([
        Animated.spring(iconScale, {
          toValue: 1.3,
          friction: 4,
          useNativeDriver: true,
        }),
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
  const router = useRouter()
  const { isDarkMode } = useTheme();
  const {  clearUser } = useUserStore();
  const [showAlert, setShowAlert] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      console.log("Screen is focused");

      const checkToken = async () => {
        try {
          console.log("Checking token...");
          const isValid = await authService.validateToken();
          console.log(isValid.message, "isValid");
          if (isValid.message === "Valid token") {
            setShowAlert(false);
          }
        } catch (error) {
          if (error.message === "Token expired") {
            setShowAlert(true);
          }
          console.log("Error in checkToken:", error);
        }
      };

      checkToken();
      const interval = setInterval(checkToken, 2 * 60 * 1000);

      return () => {
        console.log("Screen is unfocused");
        clearInterval(interval);
      };
    }, [])
  );


  const handleLogout = () => {
    clearUser()
    router.replace("Authentication/Login")
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarActiveBackgroundColor: isDarkMode ? "black" : "#fafafa",
          tabBarStyle: {
            position: "absolute",
            left: 16,
            right: 16,
            height: 80,
            elevation: 0,
            backgroundColor: isDarkMode ? "black" : "white",
            borderRadius: 26,
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
                  size={25}
                  color={focused ? color : Colors.lable}
                  style={{ marginTop: 6 }}
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
                  style={{ marginTop: 5 }}
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
                  size={22}
                  color={focused ? color : Colors.lable}
                  style={{ marginTop: 6 }}
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
            tabBarStyle: { display: "none" },
            tabBarLabel: "",
            tabBarIcon: ({ focused, color }) => (
              <AnimatedTabIcon focused={focused}>
                <MaterialCommunityIcons
                  name="account-outline"
                  size={28}
                  color={focused ? color : Colors.lable}
                  style={{ marginTop: 5 }}
                />
              </AnimatedTabIcon>
            ),
          }}
        />
      </Tabs>
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
    </>
  );
}
