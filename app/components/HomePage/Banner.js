import React from "react";
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
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("screen");

const Banner = () => {
  const router = useRouter();
  const notificationCount = 37;

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
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
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
