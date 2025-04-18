import React from "react";
import { View, ScrollView, Dimensions } from "react-native";
import Title from "../Title/Title";
import AppSkeleton from "../AppSkeleton";
import { useRouter } from "expo-router";
import { useTheme } from "../../helper/themeProvider";
import RecentPetCard from "../RecentPetCard/RecentPetCard";

const RecentPets = ({ pets = [], isLoading }) => {
  const { width, height } = Dimensions.get("screen");
  const { isDarkMode } = useTheme();
  const router = useRouter();

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
            {isLoading
              ? [...Array(3)].map((_, index) => (
                  <AppSkeleton
                    key={index}
                    width={width / 1.4}
                    height={height / 5.8}
                    borderRadius={8}
                  />
                ))
              : pets.map((pet, index) => (
                  <RecentPetCard
                    key={index}
                    pet={pet}
                    like={pet?.liked}
                    superLike={pet?.super_liked}
                    onUpdate={()=>null}
                  />
                ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default RecentPets;
