import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../../theme/color";
import { Link, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import style from "../../../theme/style";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Setting() {
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
          title="Settings"
          titleStyle={[style.apptitle, { color: Colors.active }]}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity onPress={() => router.back()}>
              <Icon name="chevron-back" color={Colors.active} size={25} />
            </TouchableOpacity>
          }
        />
        <ScrollView
          style={{ marginTop: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Link href="/Security">
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../../../../assets/images/profile/security.png")}
                style={{ width: 20, height: 20 }}
              />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={[style.s16, { color: Colors.active }]}>
                  Security
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={Colors.disable} />
            </View>
          </Link>
          <View style={[style.divider, { marginVertical: 15 }]}></View>

          {/* Notification - Using Image Icon */}
          <Link href="/Notification1">
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                resizeMode="contain"
                source={require("../../../../assets/images/profile/noty.png")}
                style={{ width: 20, height: 20 }}
              />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={[style.s16, { color: Colors.active }]}>
                  Notification
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={Colors.disable} />
            </View>
          </Link>
          <View style={[style.divider, { marginVertical: 15 }]}></View>

          <Link href="/MyAccount/screens/DarkMode">
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name="dark-mode"
                size={24}
                color={Colors.disable}
              />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={[style.s16, { color: Colors.active }]}>
                  Dark Mode
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={Colors.disable} />
            </View>
          </Link>
          <View style={[style.divider, { marginVertical: 15 }]}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
