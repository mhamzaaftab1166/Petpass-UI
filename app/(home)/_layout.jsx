// app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons,MaterialIcons , Entypo } from "@expo/vector-icons"; // Import from Expo Vector Icons
import { BottomFabBar } from "rn-wave-bottom-bar";
import { Colors } from "../theme/color"; // adjust the path as needed

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarActiveBackgroundColor: "#fafafa",
        tabBar: (props) => (
          <BottomFabBar
            mode="default"
            isRtl={false}
            bottomBarContainerStyle={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            }}
            {...props}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Entypo
              name="home"
              size={24}
              color={focused ? color : Colors.lable}
            />
          ),
        }}
      />

      {/* Tips Tab */}
      <Tabs.Screen
        name="MyAccount"
        options={{
          title: "Account",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              name="account-circle"
              size={24}
              color={focused ? Colors.color : Colors.lable}
            />
          ),
        }}
      />

      {/* Schedule Tab */}
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="calendar-outline"
              size={30}
              color={focused ? Colors.secondary : Colors.lable}
            />
          ),
        }}
      />

      {/* Store1 Tab */}
      <Tabs.Screen
        name="store1" // This points to app/(tabs)/store1.tsx
        options={{
          title: "Store1",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="location-outline"
              size={30}
              color={focused ? Colors.secondary : Colors.lable}
            />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              size={30}
              color={focused ? Colors.secondary : Colors.lable}
            />
          ),
        }}
      />
    </Tabs>
  );
}
