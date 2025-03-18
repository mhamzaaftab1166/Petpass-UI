import React from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-paper";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import Title from "../Title/Title";
import { useTheme } from "../../helper/themeProvider";
import { useRouter } from "expo-router";
import AppSkeleton from "../AppSkeleton";

const RecentPets = ({ pets = [], isLoading }) => {
  const { width, height } = Dimensions.get("screen");
  const { isDarkMode } = useTheme();
  const router = useRouter();

  if (isLoading) {
    return (
      <>
        <Title title="Recent Pets" onClick={handleViewAllClick} />
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                gap: 16,
              }}
            >
              {[...Array(3)].map((_, index) => (
                <AppSkeleton
                  key={index}
                  width={width / 1.4}
                  height={height / 5.8}
                  borderRadius={8}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
  

  const handleViewAllClick = () => {
    router.push("/GeneralScreens/RecentPets/recentPetsListing");
  };

  return (
    <>
      <Title title="Recent Pets" onClick={handleViewAllClick} />
      <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              gap: 16,
            }}
          >
            {pets.map((pet, index) => (
              <TouchableOpacity
                onPress={() =>
                  router.push(
                    `/PetDetails/PetDetailPage?id=${pet?.id}&isPublic=true&userId=${pet.user_id}`
                  )
                }
                key={index}
              >
                <ImageBackground
                  source={{ uri: pet.pet_profile_picture }}
                  resizeMode="cover"
                  style={{
                    width: width / 1.4,
                    height: height / 5.8,
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "flex-end",
                      flex: 1,
                      marginBottom: 10,
                      marginHorizontal: 10,
                      borderRadius: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View>
                        <Text style={[style.b16, { color: Colors.secondary }]}>
                          {pet?.pet_name.charAt(0).toUpperCase() +
                            pet?.pet_name.slice(1)}
                        </Text>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Icon name="star" color={"#FFCE00"} size={12}></Icon>
                          <Icon name="star" color={"#FFCE00"} size={12}></Icon>
                          <Icon name="star" color={"#FFCE00"} size={12}></Icon>
                          <Icon
                            name="star-outline"
                            color={Colors.secondary}
                            size={12}
                          ></Icon>
                          <Icon
                            name="star-outline"
                            color={Colors.secondary}
                            size={12}
                          ></Icon>
                          <Text
                            style={[style.b10, { color: Colors.secondary }]}
                          >
                            {pet.pet_breed.charAt(0).toUpperCase() +
                              pet.pet_breed.slice(1)}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <View style={{ alignItems: "flex-end" }}>
                          <Text
                            style={[style.b16, { color: Colors.secondary }]}
                          >
                            {pet?.color.charAt(0).toUpperCase() +
                              pet.color.slice(1)}
                          </Text>
                          <Text
                            style={[style.b10, { color: Colors.secondary }]}
                          >
                            {" "}
                            {pet.gender.charAt(0).toUpperCase() +
                              pet.gender.slice(1)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default RecentPets;
