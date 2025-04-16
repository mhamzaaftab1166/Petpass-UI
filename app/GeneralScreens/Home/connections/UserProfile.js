import React from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Text,
} from "react-native";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../../helper/themeProvider";
import { router } from "expo-router";
import style from "../../../theme/style";
import { Colors } from "../../../theme/color";
import profilePlaceholder from "../../../../assets/images/profilePlaceHolder.png";
import PetListingItem from "../../../components/PetListingItem/PetListingItem";

const userData = {
  fullName: "M Hamza Aftab",
  email: "mhamzaaftab@example.com",
  phone: "+971 52 100 6471",
  roles: ["Pet Owner", "Pet Breeder", "Pet Shop"],
  connections: 78,
  profile_picture: null,
};

const petData = [
  {
    id: 1,
    pet_name: "Tommy",
    pet_type: "Dog",
    gender: "Male",
    pet_breed: "American Safferd",
    date_of_birth: "2024-12-25T10:30:00Z",
    pet_address: { city: "Dubai", country: "UAE" },
    pet_profile_picture: "https://placehold.co/600x400.png",
  },
  {
    id: 2,
    pet_name: "Tommy",
    pet_type: "Dog",
    gender: "Male",
    pet_breed: "American Safferd",
    date_of_birth: "2024-12-25T10:30:00Z",
    pet_address: { city: "Dubai", country: "UAE" },
    pet_profile_picture: "https://placehold.co/600x400.png",
  },
  {
    id: 3,
    pet_name: "Tommy",
    pet_type: "Dog",
    gender: "Male",
    pet_breed: "American Safferd",
    date_of_birth: "2024-12-25T10:30:00Z",
    pet_address: { city: "Dubai", country: "UAE" },
    pet_profile_picture: "https://placehold.co/600x400.png",
  },
];

export default function UserProfile() {
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaView
      style={[
        style.area,
        {
          flex: 1,
          backgroundColor: isDarkMode ? Colors.dark : Colors.secondary,
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <AppBar
          color={isDarkMode ? Colors.active : Colors.secondary}
          titleStyle={[
            style.apptitle,
            {
              color: isDarkMode ? Colors.secondary : Colors.active,
              fontFamily: "Avenir-Bold",
            },
          ]}
          centerTitle={true}
          elevation={0}
          title="Profile"
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

        <ScrollView contentContainerStyle={s.container}>
          {/* Profile Image */}
          <View style={s.profileImageContainer}>
            <Image
              source={
                userData.profile_picture
                  ? { uri: userData.profile_picture }
                  : profilePlaceholder
              }
              style={s.profileImage}
            />
          </View>

          <View
            style={[
              s.card,
              {
                backgroundColor: isDarkMode ? Colors.dark : Colors.white,
                borderWidth: isDarkMode ? 1 : 0,
                borderColor: isDarkMode ? Colors.primary : "transparent",
              },
            ]}
          >
            <View style={s.nameRow}>
              <Text
                style={[
                  s.fullName,
                  { color: isDarkMode ? Colors.secondary : Colors.title },
                ]}
              >
                {userData.fullName}
              </Text>
              <Text
                style={[
                  s.connections,
                  { color: isDarkMode ? Colors.disable : Colors.primary },
                ]}
              >
                Connections ({userData.connections})
              </Text>
            </View>
            <View style={[style.divider, { marginBottom: 15 }]} />
            <View style={s.detailRow}>
              <Icon
                name="mail-outline"
                size={20}
                color={isDarkMode ? Colors.disable : Colors.primary}
              />
              <Text
                style={[
                  s.detailText,
                  { color: isDarkMode ? Colors.secondary : Colors.lable },
                ]}
              >
                {userData.email}
              </Text>
            </View>
            <View style={s.detailRow}>
              <Icon
                name="call-outline"
                size={20}
                color={isDarkMode ? Colors.disable : Colors.primary}
              />
              <Text
                style={[
                  s.detailText,
                  { color: isDarkMode ? Colors.secondary : Colors.lable },
                ]}
              >
                {userData.phone}
              </Text>
            </View>
            <View style={s.rolesContainer}>
              <MaterialCommunityIcons
                name="account-box-outline"
                size={25}
                color={isDarkMode ? Colors.disable : Colors.primary}
              />
              {userData.roles.map((role, index) => (
                <View
                  key={index}
                  style={[
                    s.roleBadge,
                    {
                      backgroundColor: Colors.primary,
                    },
                  ]}
                >
                  <Text
                    style={[
                      s.roleText,
                      { color: isDarkMode ? Colors.secondary : "#fff" },
                    ]}
                  >
                    {role}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Added Pets Card */}
          <View
            style={[
              s.card,
              {
                backgroundColor: isDarkMode ? Colors.dark : Colors.white,
                borderWidth: isDarkMode ? 1 : 0,
                borderColor: isDarkMode ? Colors.primary : "transparent",
              },
            ]}
          >
            <View style={s.nameRow}>
              <Text
                style={[
                  s.fullName,
                  { color: isDarkMode ? Colors.secondary : Colors.title },
                ]}
              >
                Added Pets
              </Text>
              <Text
                style={[
                  s.connections,
                  { color: isDarkMode ? Colors.disable : Colors.primary },
                ]}
              >
                (20)
              </Text>
            </View>
            <View style={[style.divider, { marginVertical: 10 }]} />
            {petData.map((item) => (
              <View
                key={item.id}
                style={[
                  s.rowFront,
                  { backgroundColor: isDarkMode ? Colors.dark : Colors.white },
                ]}
              >
                <PetListingItem pet={item} home={true} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },
  profileImageContainer: {
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 100,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  card: {
    width: "95%",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  fullName: {
    fontSize: 22,
    fontWeight: "700",
    fontFamily: "Avenir-Bold",
  },
  connections: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Avenir",
    alignSelf: "center",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "Avenir",
  },
  rolesContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 10,
  },
  roleBadge: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
    margin: 4,
    marginTop: 0,
  },
  roleText: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Avenir-Bold",
  },
  rowFront: {
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
    width: "100%",
    zIndex: 2,
  },
});
