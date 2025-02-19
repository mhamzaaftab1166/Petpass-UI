import {
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
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
import { SwipeListView } from "react-native-swipe-list-view";

const { width, height } = Dimensions.get("screen");

const petsData = [
  { id: "1", name: "Pet 1" },
  { id: "2", name: "Pet 2" },
  { id: "3", name: "Pet 3" },
];

export default function MyPets({ isDelete = true }) {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.rowFront,
        { backgroundColor: isDarkMode ? Colors.dark : Colors.white },
      ]}
    >
      <PetListingItem pet={item} />
    </View>
  );
  const renderHiddenItem = () => (
    <View style={styles.rowBack}>
      <TouchableOpacity style={styles.deleteButton} onPress={() => {}}>
        <Icon name="trash" color="#FA6262" size={30} />
      </TouchableOpacity>
    </View>
  );

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
          Manage Your Pets Here
        </Text>

        <SwipeListView
          data={petsData}
          renderItem={renderItem}
          renderHiddenItem={isDelete ? renderHiddenItem : null}
          rightOpenValue={-75}
          disableRightSwipe
        />
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
  rowFront: {
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
    zIndex: 2,
    elevation: 2,
  },
  rowBack: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 10,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  deleteButton: {},
});
