import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useRouter } from "expo-router";
import style from "../theme/style";
import { Colors } from "../theme/color";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import { useTheme } from "../helper/themeProvider";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

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
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    console.log("Refresh pressed");
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleDeleteNotification = (notificationId) => {
    console.log("Delete pressed for notification", notificationId);
  };

  const renderItem = (data) => (
    <View
      style={[
        styles.rowFront,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 20,
        }}
      >
        <Image
          source={data.item.image}
          style={{
            resizeMode: "stretch",
            height: height / 12,
            width: width / 5,
          }}
        />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text
            style={[
              style.r16,
              { color: isDarkMode ? Colors.secondary : Colors.active },
            ]}
          >
            {data.item.message}
          </Text>
          <Text
            style={[
              style.r12,
              {
                color: isDarkMode ? Colors.secondary : Colors.disable,
                marginTop: 10,
              },
            ]}
          >
            {data.item.time}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderHiddenItem = (data) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteNotification(data.item.id)}
      >
        <Icon name="trash" color="#FA6262" size={30} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        style.area,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >
      {/* App Bar */}
      <AppBar
        color={isDarkMode ? Colors.active : Colors.secondary}
        title="Notification"
        titleStyle={[
          style.apptitle,
          {
            color: isDarkMode ? Colors.secondary : Colors.active,
            fontFamily: "Avenir-Bold",
          },
        ]}
        centerTitle={true}
        elevation={0}
        style={{ marginHorizontal: 20, marginTop: 10 }}
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

      <SwipeListView
        data={notifications}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        disableRightSwipe
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ItemSeparatorComponent={() => (
          <View style={[style.divider, { marginVertical: 10 }]} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rowFront: {
    borderBottomColor: "#CCC",
   
    zIndex: 2,
    elevation: 2,
    paddingVertical: 10,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "transparent",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 15,
    marginVertical: 10,
  },
  deleteButton: {
    width: 75,
    alignItems: "center",
    justifyContent: "center",
  },
});
