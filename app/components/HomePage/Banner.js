import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import { useUserStore } from "../../store/useStore";
import { useFocusEffect, useRouter } from "expo-router";
import { getUnreadIndieNotificationInboxCount } from "native-notify";
import notificationData from "../../constants/notification";

const { width, height } = Dimensions.get("screen");

const Banner = () => {
  const { user } = useUserStore();
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const router = useRouter();
    useFocusEffect(
      useCallback(() => {
        async function fetchUnreadCount() {
          
          try {
            const unreadCount = await getUnreadIndieNotificationInboxCount(
              String(user?.id),
              notificationData.appId,
              notificationData.appToken
            );
            console.log("unreadCount: ", unreadCount);
            setUnreadNotificationCount(unreadCount);
          } catch (error) {
            console.error("Error fetching unread count:", error);
          }
        }
        fetchUnreadCount();
      }, [user])
    );


  return (
    <ImageBackground
      source={require("../../../assets/images/home/banner1.png")}
      resizeMode="stretch"
      style={{ width, height: height / 3, paddingTop: 40 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 20,
        }}
      >
        <View
          style={[
            style.txtinput,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderColor: Colors.border,
              borderWidth: 1,
              backgroundColor: "#FFFFFF70",
              borderRadius: 10,
              flex: 1,
              paddingHorizontal: 10,
              height: 43,
            },
          ]}
        >
          <TouchableOpacity>
            <Icon name="search" color={Colors.secondary} size={20} />
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            selectionColor={Colors.primary}
            placeholderTextColor={Colors.secondary}
            style={{ color: Colors.secondary, flex: 1, marginHorizontal: 10 }}
          />
        </View>

        {/* Notification Icon with count badge */}
        <TouchableOpacity
          style={styles.notificationContainer}
          onPress={() => router.push("/GeneralScreens/Notifications")}
        >
          <Icon
            name="notifications-outline"
            color={Colors.secondary}
            size={30}
          />
          {unreadNotificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadNotificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Banner Text */}
      <Text
        style={[
          style.s18,
          {
            color: Colors.secondary,
            marginTop: 60,
            marginLeft: 20,
            fontWeight: "800",
            fontFamily: "Avenir-Bold",
          },
        ]}
      >
        PETPASS
      </Text>
      <View
        style={{
          width: width / 5.5,
          backgroundColor: Colors.secondary,
          height: 3,
          marginLeft: 20,
          marginTop: 5,
        }}
      />
      <Text
        style={[
          style.title,
          {
            color: Colors.secondary,
            marginTop: 25,
            marginLeft: 20,
            fontSize: 28,
            fontFamily: "Avenir-Bold",
          },
        ]}
      >
        LOVE YOUR PET
      </Text>
    </ImageBackground>
  );
};

export default Banner;

const styles = StyleSheet.create({
  notificationContainer: {
    marginHorizontal: 10,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
