import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../../theme/color";
import { Link, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import style from "../../../theme/style";
import noty from "../../../../assets/images/profile/noty.png"
import notyDark from "../../../../assets/images/profile/notyDark.png"
import security from "../../../../assets/images/profile/security.png";
import securityDark from "../../../../assets/images/profile/securityDark.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { Switch } from "react-native-paper";
import { useTheme } from "../../../helper/themeProvider";

export default function Setting() {
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <SafeAreaView
      style={[
        style.area,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >
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
          title="Settings"
          titleStyle={[
            style.apptitle,
            {
              color: isDarkMode ? Colors.secondary : Colors.active,
              fontFamily: "Avenir-Bold",
            },
          ]}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity onPress={() => router.back()}>
              <Icon
                name="chevron-back"
                color={isDarkMode ? Colors.secondary : Colors.active}
                size={25}
              />
            </TouchableOpacity>
          }
        />
        <ScrollView
          style={{ marginTop: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Link href="/MyAccount/screens/Security">
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                resizeMode="contain"
                source={isDarkMode ? securityDark : security}
                style={{ width: 25, height: 25 }}
              />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text
                  style={[
                    style.s16,
                    { color: isDarkMode ? Colors.secondary : Colors.active },
                  ]}
                >
                  Security
                </Text>
              </View>
              <Icon
                name="chevron-forward"
                size={20}
                color={isDarkMode ? Colors.secondary : Colors.disable}
              />
            </View>
          </Link>
          <View style={[style.divider, { marginVertical: 15 }]}></View>

          <Link href="/Notification1">
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                resizeMode="contain"
                source={isDarkMode ? notyDark : noty}
                style={{ width: 25, height: 25 }}
              />

              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text
                  style={[
                    style.s16,
                    { color: isDarkMode ? Colors.secondary : Colors.active },
                  ]}
                >
                  Notification
                </Text>
              </View>
              <Icon
                name="chevron-forward"
                size={25}
                color={isDarkMode ? Colors.secondary : Colors.disable}
              />
            </View>
          </Link>
          <View style={[style.divider, { marginVertical: 15 }]}></View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons
              name="dark-mode"
              size={24}
              color={isDarkMode ? Colors.secondary : Colors.disable}
            />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text
                style={[
                  style.s16,
                  { color: isDarkMode ? Colors.secondary : Colors.active },
                ]}
              >
                Dark Mode
              </Text>
            </View>
            <Switch
              color={Colors.primary}
              value={isDarkMode}
              onValueChange={toggleTheme}
            />
          </View>
          <View style={[style.divider, { marginVertical: 15 }]}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
