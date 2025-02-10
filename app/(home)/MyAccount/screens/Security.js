import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../../theme/color";
import { Link, useRouter } from "expo-router";
import style from "../../../theme/style";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../helper/themeProvider";

export default function Security() {
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
          title="Security"
          titleStyle={[
            style.apptitle,
            { color: isDarkMode ? Colors.secondary : Colors.active },
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
          <Link href="/Security">
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text
                  style={[
                    style.s16,
                    { color: isDarkMode ? Colors.secondary : Colors.active },
                  ]}
                >
                  Change Email
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

          <Link href="/MyAccount/screens/EditPassword">
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text
                  style={[
                    style.s16,
                    { color: isDarkMode ? Colors.secondary : Colors.active },
                  ]}
                >
                  Change Password
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
