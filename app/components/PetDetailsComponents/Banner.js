import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { AppBar, HStack } from "@react-native-material/core";
import { Colors } from "../../theme/color";
import AppIcon from "../../components/Likes/AppLike";
import petServices from "../../services/petServices";
import usePetLike from "../../hooks/usePetLike";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const Banner = ({
  router,
  pet,
  isPublic,
  onDownload,
  home,
  heartCount = 0,
  superLikeCount = 0,
  superLike = false,
  like = false,
  onUpdate,
}) => {
  console.log(pet);

 const { activeLike, handleLike, localHeartCount,localSuperLikeCount } = usePetLike({
   petId: pet?.id,
   initialLike: like,
   initialSuperLike: superLike,
   onUpdate,
   heartCount,
   superLikeCount,
 });

  return (
    <View>
      <ImageBackground
        source={{ uri: pet?.pet_profile_picture }}
        resizeMode="cover"
        style={{ width, height: height / 3.2 }}
      >
        <AppBar
          style={styles.appBar}
          elevation={0}
          leading={
            <TouchableOpacity
              onPress={() => {
                if (isPublic) {
                  router.back();
                } else {
                  if (home) {
                    router.back();
                  } else {
                    router.replace("/MyAccount/screens/MyPets");
                  }
                }
              }}
            >
              <Ionicons
                name="chevron-back"
                color={Colors.secondary}
                size={30}
              />
            </TouchableOpacity>
          }
          trailing={
            <HStack style={{ gap: 16 }}>
              <Pressable onPress={onDownload}>
                <Ionicons
                  name="cloud-download-outline"
                  color={Colors.secondary}
                  size={25}
                  style={{ marginTop: 2 }}
                />
              </Pressable>
              <AppIcon
                type="FontAwesome"
                name="heart"
                size={25}
                color={Colors.secondary}
                activeColor="red"
                alreadyActive={activeLike === "like"}
                onPress={() => handleLike("like")}
              />
              <AppIcon
                type="Entypo"
                name="shield"
                size={27}
                color={Colors.secondary}
                activeColor="#eab308"
                variant="superlike"
                alreadyActive={activeLike === "super_like"}
                onPress={() => handleLike("super_like")}
              />
            </HStack>
          }
        />
        <View style={styles.bottomRightContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="heart" size={22} color="red" style={styles.icon} />
            <Text
              style={[
                styles.countText,
                { color: Colors.secondary, fontFamily: "Avenir-Bold" },
              ]}
            >
              {localHeartCount}
            </Text>
          </View>
          <View style={[styles.iconContainer, { marginLeft: 16 }]}>
            <Entypo
              name="shield"
              size={22}
              color="#eab308"
              style={styles.icon}
            />
            <Text
              style={[
                styles.countText,
                { color: Colors.secondary, fontFamily: "Avenir-Bold" },
              ]}
            >
              {localSuperLikeCount}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: "transparent",
    marginTop: 35,
    marginHorizontal: 10,
    justifyContent: "center",
  },
  bottomRightContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    opacity: 0.9,
    marginRight: 4,
  },
  countText: {
    fontSize: 14,
    opacity: 0.9,
  },
});

export default Banner;
