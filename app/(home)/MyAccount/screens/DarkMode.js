import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../../theme/color";
import { Link, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import style from "../../../theme/style";
import { SafeAreaView } from "react-native-safe-area-context";
import { Switch } from "react-native-paper";

export default function DarkMode() {
  const router = useRouter();

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = () => {
    setIsDarkMode((prevState) => !prevState);
  };

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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="dark-mode" size={24} color={Colors.disable} />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text
                style={[
                  style.s16,
                  { color: isDarkMode ? Colors.primary : Colors.active },
                ]}
              >
                Dark Mode
              </Text>
            </View>
            <Switch
              color={Colors.primary}
              value={isDarkMode}
              onValueChange={toggleSwitch}
            />
          </View>

          <View style={[style.divider, { marginVertical: 15 }]}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
