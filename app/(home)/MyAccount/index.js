import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { Colors } from "../../theme/color";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import style from "../../theme/style";
import { useRouter } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";

const { width, height } = Dimensions.get("screen");

export default function MyAccount() {
  const router = useRouter();

  return (
    <SafeAreaView style={[style.area, { backgroundColor: Colors.secondary }]}>
      <View
        style={[
          style.main,
          { backgroundColor: Colors.secondary, marginTop: 10 },
        ]}
      >
        <AppBar
          color={Colors.secondary}
          elevation={0}
          trailing={
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => router.push("/MyAccount/screens/Notifications")}
              >
                <Ionicons
                  name="notifications-outline"
                  color={Colors.active}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          }
        />

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => router.push("/MyAccount/screens/ProfileInfo")}
          >
            <Avatar.Image
              source={require("../../../assets/images/profile/profile.png")}
              style={{ backgroundColor: Colors.secondary }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={[style.apptitle, { color: Colors.active }]}>
                Anita Rose
              </Text>
              <Text style={[style.r14, { color: Colors.disable }]}>
                anitarose@gmail.com
              </Text>
            </View>
            <View style={{ alignItems: "flex-end", flex: 1 }}>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.disable}
              />
            </View>
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
              style={{ width: width / 8, height: height / 22 }}
            />
            <Text style={[style.b12, { color: Colors.disable, marginTop: 10 }]}>
              Address
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
                marginHorizontal: 8,
              },
            ]}
          >
            <Image
              source={require("../../../assets/images/profile/t17.png")}
              resizeMode="stretch"
              style={{ width: width / 8, height: height / 22 }}
            />
            <Text style={[style.b12, { color: Colors.disable, marginTop: 10 }]}>
              Security
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
            <Text style={[style.b12, { color: Colors.disable, marginTop: 10 }]}>
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
              icon: "account-edit",
              materialIcon: true,
              route: "/MyAccount/screens/ProfileInfo",
            },
            {
              name: "Notifications",
              icon: "notifications-outline",
              route: "/MyAccount/screens/Notifications",
            },
            {
              name: "Settings",
              materialIcon: true,
              icon: "cogs",
              route: "/orderDetail",
            },
            {
              name: "Help Center",
              materialIcon: true,
              icon: "help-circle-outline",
              route: "/setting",
            },
            {
              name: "Log Out",
              icon: "logout",
              materialIcon: true,
              isRed: true,
            },
          ].map((item, index, array) => (
            <View key={index}>
              <TouchableOpacity
                onPress={() => item.route && router.push(item.route)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                {item.materialIcon ? (
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={25}
                    color={Colors.active}
                  />
                ) : (
                  <Ionicons name={item.icon} size={25} color={Colors.active} />
                )}
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={[
                      style.s16,
                      { color: item.isRed ? "red" : Colors.active },
                    ]}
                  >
                    {item.name}
                  </Text>
                </View>
                <View style={{ alignItems: "flex-end", flex: 1 }}>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={Colors.disable}
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
