import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useCallback, useState } from "react";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import { useTheme } from "../../helper/themeProvider";
import { router, useFocusEffect } from "expo-router";
import homeService from "../../services/homeService";
import Loader from "../../components/Loader/Loader";
import AppSkeleton from "../../components/AppSkeleton";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function PetListing() {
  const { isDarkMode } = useTheme();
  const [tips, setTips] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("All");

  useFocusEffect(
    useCallback(() => {
      const fetchTips = async () => {
        try {
          setLoading(true);
          setError(null);
          const data = await homeService.getTips();
          setTips(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchTips();
    }, [])
  );

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  if (loading)
    return (
      <>
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
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          {[...Array(2)].map((_, index) => (
            <View key={index}>
              <AppSkeleton
                width={width / 2.3}
                height={height / 5.8}
                borderRadius={10}
              />
              <AppSkeleton width={width / 2.3} height={20} />
              <AppSkeleton width={width / 2.3} height={20} />
              <AppSkeleton width={width / 2.3} height={20} />
            </View>
          ))}
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          {[...Array(2)].map((_, index) => (
            <View key={index}>
              <AppSkeleton
                width={width / 2.3}
                height={height / 5.8}
                borderRadius={10}
              />
              <AppSkeleton width={width / 2.3} height={20} />
              <AppSkeleton width={width / 2.3} height={20} />
              <AppSkeleton width={width / 2.3} height={20} />
            </View>
          ))}
        </View>
      </>
    );
  if (error) return <Text>Error: {error}</Text>;

  // Filter tips based on selected tab (convert both to lowercase before comparing)
  const filteredTips =
    selectedTab === "All"
      ? tips
      : tips.filter(
          (tip) =>
            tip.category &&
            tip.category.toLowerCase() === selectedTab.toLowerCase()
        );

  // Group the tips into rows (2 per row)
  const tipRows = filteredTips.reduce((rows, tip, index) => {
    if (index % 2 === 0) {
      rows.push([tip]);
    } else {
      rows[rows.length - 1].push(tip);
    }
    return rows;
  }, []);

  return (
    <SafeAreaView
      style={[
        style.area,
        { backgroundColor: isDarkMode ? Colors.dark : Colors.secondary },
      ]}
    >
      <View
        style={[
          style.main,
          { backgroundColor: isDarkMode ? Colors.dark : Colors.secondary },
        ]}
      >
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
            flexWrap: "wrap",
            justifyContent: "center",
            marginVertical: 20,
          }}
        >
          {["All", "Dog", "Cat", "Fish"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
                flexBasis: "48%",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: Colors.primary,
                backgroundColor: selectedTab === tab ? Colors.primary : "white",
                marginHorizontal: "1%",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  color: selectedTab === tab ? "white" : Colors.primary,
                  fontFamily: "Avenir-Bold",
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 20 }}>
            {tipRows.map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                {row.map((tip, colIndex) => (
                  <TouchableOpacity
                    onPress={() =>
                      router.push(
                        `/GeneralScreens/Tips/TipDetailPage?id=${tip?.id}`
                      )
                    }
                    key={colIndex}
                    style={{ width: width / 2.3 }}
                  >
                    <ImageBackground
                      source={{ uri: tip.image }}
                      resizeMode="cover"
                      style={{
                        height: height / 5.8,
                        borderRadius: 10,
                        overflow: "hidden",
                      }}
                    />
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={[
                        style.b14,
                        {
                          color: isDarkMode ? Colors.secondary : Colors.active,
                          marginTop: 10,
                          paddingLeft: 2,
                        },
                      ]}
                    >
                      {truncateText(tip.title, 25)}
                    </Text>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={[
                        style.r14,
                        {
                          color: isDarkMode ? Colors.secondary : Colors.disable,
                          gap: 3,
                        },
                      ]}
                    >
                      {truncateText(tip.overview, 60)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
