import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import { useTheme } from "../../helper/themeProvider";
import { router } from "expo-router";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function PetListing() {
  const { isDarkMode } = useTheme();
  const [selectedTab, setSelectedTab] = useState("All");

  return (
    <SafeAreaView style={[style.area, { backgroundColor: Colors.secondary }]}>
      <View style={[style.main, { backgroundColor: Colors.secondary }]}>
        <AppBar
          color={isDarkMode ? Colors.active : Colors.secondary}
          titleStyle={[
            style.apptitle,
            { color: isDarkMode ? Colors.secondary : Colors.active },
          ]}
          centerTitle={true}
          elevation={0}
          title="Pet Tips"
          leading={
            <TouchableOpacity onPress={() => router.back()}>
              <Icon
                name="chevron-back"
                color={isDarkMode ? Colors.secondary : Colors.active}
                size={30}
              />
            </TouchableOpacity>
          }
        />

        {/* Button Row */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap", // This ensures the buttons wrap to the next line
            justifyContent: "center",
            marginVertical: 20,
          }}
        >
          {["All", "Dogs", "Cats", "Others"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
                flexBasis: "48%", // Makes each button take up about 48% of the width
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: Colors.primary,
                backgroundColor: selectedTab === tab ? Colors.primary : "white",
                marginHorizontal: "1%", // Ensures space between buttons
                marginBottom: 10, // Adds space between rows
              }}
            >
              <Text
                style={{
                  color: selectedTab === tab ? "white" : Colors.primary,
                  fontWeight: "bold",
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
      </View>
    </SafeAreaView>
  );
}
