import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import style from "../theme/style"
import { Colors } from "../theme/color";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import { useTheme } from "../helper/themeProvider"

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

// Notification Data
const notifications = [
  {
    id: 1,
    image: require("../../assets/images/profile/notification.png"),
    message: "The order has been confirmed, please check the delivery time.",
    time: "1 hour ago",
  },
  {
    id: 2,
    image: require("../../assets/images/profile/notification.png"),
    message: "Sam commented on the post: ‘Wow, this article is useful’.",
    time: "1 hour ago",
  },
  {
    id: 3,
    image: require("../../assets/images/profile/notification.png"),
    message: "The order has been confirmed, please check the delivery time.",
    time: "4 hours ago",
  },
  {
    id: 4,
    image: require("../../assets/images/profile/notification.png"),
    message: "The order has been confirmed, please check the delivery time.",
    time: "1 day ago",
  },
  {
    id: 5,
    image: require("../../assets/images/profile/notification.png"),
    message: "Sam commented on the post: ‘Wow, this article is useful’.",
    time: "1 day ago",
  },
  {
    id: 6,
    image: require("../../assets/images/profile/notification.png"),
    message: "Sam commented on the post: ‘Wow, this article is useful’.",
    time: "2 days ago",
  },
  {
    id: 7,
    image: require("../../assets/images/profile/notification.png"),
    message: "The order has been confirmed, please check the delivery time.",
    time: "5 days ago",
  },
  {
    id: 8,
    image: require("../../assets/images/profile/notification.png"),
    message: "The order has been successfully canceled.",
    time: "1 hour ago",
  },
];

export default function Notification() {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaView style={[style.area, { backgroundColor: isDarkMode ? Colors.active : Colors.secondary }]}>
      {/* App Bar */}
      <AppBar
        color={isDarkMode ? Colors.active : Colors.secondary}
        title="Notification"
        titleStyle={[style.apptitle, { color: isDarkMode ? Colors.secondary : Colors.active }]}
        centerTitle={true}
        elevation={0}
        style={{ marginHorizontal: 20, marginTop: 10 }}
        leading={
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="chevron-back" color={isDarkMode ? Colors.secondary : Colors.active} size={30} />
          </TouchableOpacity>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {notifications.map((item, index) => (
          <View
            key={item.id}
            style={{
              backgroundColor: item.background || "transparent",
              paddingVertical: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 20,
              }}
            >
              <Image
                source={item.image}
                style={{
                  resizeMode: "stretch",
                  height: height / 12,
                  width: width / 5,
                }}
              />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={[style.r16, { color: isDarkMode ? Colors.secondary : Colors.active }]}>
                  {item.message}
                </Text>
                <Text
                  style={[style.r12, { color: isDarkMode ? Colors.secondary : Colors.disable, marginTop: 10 }]}
                >
                  {item.time}
                </Text>
              </View>
            </View>
            
            {index !== notifications.length - 1 && (
              <View style={[style.divider, { marginVertical: 10 }]} />
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
