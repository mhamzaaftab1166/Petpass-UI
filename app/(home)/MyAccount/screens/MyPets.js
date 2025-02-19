import {
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import React from "react";
import { AppBar } from "@react-native-material/core";
import { Colors } from "../../../theme/color";
import style from "../../../theme/style";
import { useRouter } from "expo-router";
import { useTheme } from "../../../helper/themeProvider";
import Icon from "react-native-vector-icons/Ionicons";
import PetListingItem from "../../../components/PetListingItem/PetListingItem";

const { width, height } = Dimensions.get("screen");

export default function MyPets() {
  const router = useRouter();
  const { isDarkMode } = useTheme();

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
          title="Your Pet List"
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
        <Text
          style={[
            styles.text,
            {
              color: Colors.primary,
              marginTop: 30,
            },
          ]}
        >
          Manage You Pets Here
        </Text>

        <PetListingItem />
        <View style={[style.divider, { marginTop: 20 }]}></View>
        <PetListingItem />
        <View style={[style.divider, { marginTop: 20 }]}></View>
        <PetListingItem />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: "Avenir-Bold",
    textAlign: "center",
  },
});
