import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  Pressable,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useRouter } from "expo-router";
import style from "../theme/style";
import { Colors } from "../theme/color";
import {
  getIndieNotificationInbox,
  deleteIndieNotificationInbox,
} from "native-notify";
import { useUserStore } from "../store/useStore";
import notification from "../constants/notification";
import Appsk from "../components/AppSkeleton/index";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import { useTheme } from "../helper/themeProvider";
import notyPLaceholder from "../../assets/images/notyPLaceholder.png";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Notification() {
  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  console.log(data);

  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const notificationsData = await getIndieNotificationInbox(
        String(user?.id),
        notification.appId,
        notification.appToken,
        50
      );
      setData(notificationsData);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(async () => {
      try {
        await fetchNotifications();
      } catch (error) {
        setError(error.message);
      } finally {
        setRefreshing(false);
      }
    }, 1000);
  };

  const handleDeleteNotification = async (notificationId) => {
    console.log("Delete pressed for notification", notificationId);
    try {
      setLoading(true);
      await deleteIndieNotificationInbox(
        String(user?.id),
        notificationId,
        notification.appId,
        notification.appToken,
        50
      );
      await fetchNotifications();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleNotificationPress = (pushDataObj) => {
    if (pushDataObj?.category === "vaccination") {
      router.push(
        `/PetDetails/PetDetailPage?id=${pushDataObj?.id}&home=${pushDataObj?.home}`
      );
    }
    if (pushDataObj?.category === "user connection") {
      router.push(`/GeneralScreens/Home/connections/Connections`);
    }
  };

  const renderItem = ({ item }) => {
    let pushDataObj = {};
    try {
      pushDataObj = JSON.parse(item.pushData);
    } catch (err) {
      console.error("Error parsing pushData:", err);
    }

    return (
      <Pressable
        onPress={() => handleNotificationPress(pushDataObj)}
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
            source={
              pushDataObj?.pet_profile_picture
                ? { uri: pushDataObj.pet_profile_picture }
                : pushDataObj?.profile_picture
                ? { uri: pushDataObj.profile_picture }
                : notyPLaceholder
            }
            style={{
              resizeMode: "cover",
              height: width / 6,
              width: width / 6,
              borderRadius: 50,
            }}
          />

          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text
              style={[
                style.r16,
                {
                  color: isDarkMode ? Colors.secondary : Colors.active,
                  fontFamily: "Avenir-Bold",
                },
              ]}
            >
              {item.title}
            </Text>
            <Text
              style={[
                style.r12,
                {
                  color: isDarkMode ? Colors.secondary : Colors.disable,
                  marginTop: 5,
                  fontFamily: "Avenir-SemiBold",
                },
              ]}
            >
              {item.message}
            </Text>
            <Text
              style={[
                style.r10,
                {
                  color: isDarkMode ? Colors.secondary : Colors.disable,
                  marginTop: 5,
                  fontFamily: "Avenir-Regular",
                },
              ]}
            >
              {item.date}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const renderHiddenItem = (data) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteNotification(data.item.notification_id)}
      >
        <Icon name="trash" color="#FA6262" size={30} />
      </TouchableOpacity>
    </View>
  );

  const renderSkeleton = (key) => (
    <View key={key} style={[styles.rowFront, { paddingVertical: 10 }]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 20,
        }}
      >
        <Appsk width={width / 5} height={height / 12} borderRadius={4} />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Appsk
            width="80%"
            height={20}
            borderRadius={4}
            style={{ marginTop: 5 }}
          />
          <Appsk
            width="60%"
            height={15}
            borderRadius={4}
            style={{ marginTop: 5 }}
          />
          <Appsk
            width="40%"
            height={15}
            borderRadius={4}
            style={{ marginTop: 5 }}
          />
        </View>
      </View>
    </View>
  );

  if (error)
    return (
      <Text style={{ color: "red", textAlign: "center", marginTop: 100 }}>
        {error}
      </Text>
    );
  return (
    <SafeAreaView
      style={[
        style.area,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >
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

      {loading ? (
        <View>{[1, 2, 3, 4, 5, 6].map((item) => renderSkeleton(item))}</View>
      ) : (
        <SwipeListView
          data={data}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-75}
          disableRightSwipe
          keyExtractor={(item) => item.notification_id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[isDarkMode ? Colors.secondary : Colors.active]}
              tintColor={isDarkMode ? Colors.secondary : Colors.active}
            />
          }
          ItemSeparatorComponent={() => (
            <View style={[style.divider, { marginVertical: 10 }]} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rowFront: {
    borderBottomColor: "#CCC",
    zIndex: 2,
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
