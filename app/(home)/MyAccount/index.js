import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useEffect } from "react";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { Colors } from "../../theme/color";
import { Ionicons } from "@expo/vector-icons";
import editProfileIcon from "../../../assets/images/profile/editProfile.png";
import editProfileDark from "../../../assets/images/profile/editProfileDark.png";
import notyIcon from "../../../assets/images/profile/noty.png";
import notyDark from "../../../assets/images/profile/notyDark.png";
import settingsIcon from "../../../assets/images/profile/settings.png";
import settingDark from "../../../assets/images/profile/settingDark.png";
import helpIcon from "../../../assets/images/profile/helplight.png";
import helpDark from "../../../assets/images/profile/helpDark.png";
import logoutIcon from "../../../assets/images/profile/logout.png";
import logoutDark from "../../../assets/images/profile/logoutDark.png";
import style from "../../theme/style";
import { useRouter } from "expo-router";
import { useUserStore } from "../../store/useStore";
import { useTheme } from "../../helper/themeProvider";
import AppSkeleton from "../../components/AppSkeleton";
import Icon from "react-native-vector-icons/Ionicons";
import { unregisterIndieDevice } from "native-notify";
import notificationData from "../../constants/notification";

const { width, height } = Dimensions.get("screen");

export default function MyAccount() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { user, loading, fetchUser, clearUser } = useUserStore();

  // const { showAlert, setShowAlert } = useAlertStore();

  // const handleLogout = () => {
  //   setShowAlert(false);
  //   clearUser();
  //   router.replace("Authentication/Login");
  // };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const iconMap = {
    "Edit Profile": isDarkMode ? editProfileDark : editProfileIcon,
    Notifications: isDarkMode ? notyDark : notyIcon,
    Settings: isDarkMode ? settingDark : settingsIcon,
    "Help Center": isDarkMode ? helpDark : helpIcon,
    "Log Out": isDarkMode ? logoutDark : logoutIcon,
  };

  return (
    <SafeAreaView
      style={[
        style.area,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >
      {/* {showAlert && (
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
      )} */}
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <View
        style={[
          style.main,
          {
            backgroundColor: isDarkMode ? Colors.active : Colors.secondary,
            marginTop: 10,
          },
        ]}
      >
        <AppBar
          color={isDarkMode ? Colors.active : Colors.secondary}
          // title={`Upload Passport`}
          titleStyle={[
            style.b18,
            { color: isDarkMode ? Colors.secondary : Colors.active },
          ]}
          centerTitle={true}
          elevation={0}
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
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() =>
              loading ? null : router.push("/MyAccount/screens/ProfileInfo")
            }
          >
            {loading ? (
              <AppSkeleton width={66} height={66} borderRadius={50} />
            ) : (
              <Avatar.Image
                source={
                  user?.profile_picture ? { uri: user.profile_picture } : null
                }
                style={{
                  backgroundColor: isDarkMode
                    ? Colors.secondary
                    : Colors.unSelect,
                }}
              />
            )}
            <View style={{ marginLeft: 10 }}>
              {loading ? (
                <AppSkeleton width={220} height={20} />
              ) : (
                <Text
                  style={[
                    style.apptitle,
                    { color: isDarkMode ? Colors.secondary : Colors.active },
                  ]}
                >
                  {user?.username}
                </Text>
              )}
              {loading ? (
                <AppSkeleton width={160} height={14} />
              ) : (
                <Text
                  style={[
                    style.r14,
                    { color: isDarkMode ? Colors.secondary : Colors.lable },
                  ]}
                >
                  {user?.email}
                </Text>
              )}
            </View>
            {!loading && (
              <View style={{ alignItems: "flex-end", flex: 1 }}>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={isDarkMode ? Colors.secondary : Colors.lable}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={[style.divider, { marginTop: 20 }]}></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 5,
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={[
              style.shadow,
              {
                backgroundColor: Colors.secondary,
                justifyContent: "center",
                alignItems: "center",
                height: height / 9,
                flex: 1,
                borderRadius: 10,
              },
            ]}
            onPress={() => router.push("/MyAccount/screens/Addresses")}
          >
            <Image
              source={require("../../../assets/images/profile/address.png")}
              resizeMode="stretch"
              style={{ width: width / 9, height: height / 22 }}
            />
            <Text style={[style.b12, { color: Colors.lable, marginTop: 10 }]}>
              Address
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/MyAccount/screens/MyPets")}
            style={[
              style.shadow,
              {
                backgroundColor: Colors.secondary,
                justifyContent: "center",
                alignItems: "center",
                height: height / 9,
                flex: 1,
                borderRadius: 10,
                marginHorizontal: 8,
              },
            ]}
          >
            <Image
              source={require("../../../assets/images/profile/mypets.png")}
              resizeMode="stretch"
              style={{ width: width / 8, height: height / 22 }}
            />
            <Text style={[style.b12, { color: Colors.lable, marginTop: 10 }]}>
              My Pets
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              style.shadow,
              {
                backgroundColor: Colors.secondary,
                justifyContent: "center",
                alignItems: "center",
                height: height / 9,
                flex: 1,
                borderRadius: 10,
              },
            ]}
          >
            <Image
              source={require("../../../assets/images/profile/aboutus.png")}
              resizeMode="stretch"
              style={{ width: width / 10, height: height / 20 }}
            />
            <Text style={[style.b12, { color: Colors.lable, marginTop: 10 }]}>
              About Us
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[style.divider, { marginTop: 20, marginBottom: 50 }]}
        ></View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {[
            {
              name: "Edit Profile",
              icon: "Edit Profile",
              route: "/MyAccount/screens/ProfileInfo",
            },
            {
              name: "Notifications",
              icon: "Notifications",
              route: "/GeneralScreens/Notifications",
            },
            {
              name: "Settings",
              icon: "Settings",
              route: "/MyAccount/screens/Settings",
            },
            {
              name: "Frequently Asked Questions",
              icon: "Help Center",
              route: "/MyAccount/screens/Faq",
            },
            {
              name: "Log Out",
              icon: "Log Out",
              isRed: true,
            },
          ].map((item, index, array) => (
            <View key={index}>
              <TouchableOpacity
                onPress={() => {
                  if (item.name === "Log Out") {
                    console.log(String(user?.id));
                    unregisterIndieDevice(
                      String(user?.id),
                      notificationData.appId,
                      notificationData.appToken
                    );
                    clearUser();
                    router.replace("/Authentication/Login");
                  } else if (item.route) {
                    router.push(item.route);
                  }
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Image
                  resizeMode="contain"
                  source={iconMap[item.icon]} // Use the mapped image
                  style={{ width: 25, height: 25 }} // Adjust the size as needed
                />
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={[
                      style.s16,
                      {
                        color: item.isRed
                          ? "red"
                          : isDarkMode
                          ? Colors.secondary
                          : Colors.active,
                      },
                    ]}
                  >
                    {item.name}
                  </Text>
                </View>
                <View style={{ alignItems: "flex-end", flex: 1 }}>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={isDarkMode ? Colors.secondary : Colors.lable}
                  />
                </View>
              </TouchableOpacity>

              {index !== array.length - 1 && (
                <View style={[style.divider, { marginBottom: 20 }]} />
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
