import React, { useCallback, useState } from "react";
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
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import style from "../../../theme/style";
import { Colors } from "../../../theme/color";
import profilePlaceholder from "../../../../assets/images/profilePlaceHolder.png";
import PetListingItem from "../../../components/PetListingItem/PetListingItem";
import connectionService from "../../../services/connectionService";
import AppSkeleton from "../../../components/AppSkeleton";

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
  const { userId } = useLocalSearchParams();
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isDarkMode } = useTheme();

  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        try {
          setLoading(true);
          const res = await connectionService.getUserDetail(userId);
          setUserDetails(res?.user);
          console.log(res);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }, [])
  );

  const typeMap = {
    pet_owner: "Pet Owner",
    pet_breeder: "Pet Breeder",
    pet_shop: "Pet Shop",
  };

  if (loading) {
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
        <ScrollView contentContainerStyle={s.container}>
          <AppSkeleton
            width={140}
            height={140}
            borderRadius={70}
            style={{ marginVertical: 20 }}
          />

          <AppSkeleton
            width="95%"
            height={200}
            borderRadius={15}
            style={{ marginBottom: 20 }}
          />

          {[...Array(3)].map((_, i) => (
            <AppSkeleton
              key={i}
              width="95%"
              height={120}
              borderRadius={15}
              style={{ marginBottom: 15 }}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

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
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        <ScrollView contentContainerStyle={s.container}>
          <View style={s.profileImageContainer}>
            <Image
              source={
                userDetails?.profile_picture
                  ? { uri: userDetails?.profile_picture }
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
                {userDetails?.username}
              </Text>
              <Text
                style={[
                  s.connections,
                  { color: isDarkMode ? Colors.disable : Colors.primary },
                ]}
              >
                Connections ({userDetails?.connection_count || 0})
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
                {userDetails?.email}
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
                {`${userDetails?.country_code} ${userDetails?.phone_number}`}
              </Text>
            </View>
            <View style={s.rolesContainer}>
              <MaterialCommunityIcons
                name="account-box-outline"
                size={25}
                color={isDarkMode ? Colors.disable : Colors.primary}
              />

              {userDetails?.profile_types?.map((role, index) => (
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
                    {typeMap[role] || role}
                  </Text>
                </View>
              ))}
            </View>
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
                Added Pets
              </Text>
              <Text
                style={[
                  s.connections,
                  { color: isDarkMode ? Colors.disable : Colors.primary },
                ]}
              >
                ({userDetails?.user_pets?.length || 0})
              </Text>
            </View>
            <View style={[style.divider, { marginVertical: 10 }]} />
            {userDetails?.user_pets?.map((item) => (
              <View
                key={item.id}
                style={[
                  s.rowFront,
                  { backgroundColor: isDarkMode ? Colors.dark : Colors.white },
                ]}
              >
                <PetListingItem pet={item} isPublic={true} home={true} />
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
    shadowRadius: 5,
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
