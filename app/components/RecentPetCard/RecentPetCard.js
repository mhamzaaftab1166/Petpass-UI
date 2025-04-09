// components/RecentPets/RecentPetCard.js

import React from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-paper";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import AppIcon from "../Likes/AppLike";
import { useRouter } from "expo-router";
import usePetLike from "../../hooks/usePetLike";

const { width, height } = Dimensions.get("screen");

const RecentPetCard = ({ pet, superLike = false, like = false, onUpdate }) => {
  const router = useRouter();

  const { activeLike, handleLike } = usePetLike({
    petId: pet?.id,
    initialLike: like,
    initialSuperLike: superLike,
    onUpdate,
  });
  return (
    <TouchableOpacity
      onPress={() =>
        router.push(
          `/PetDetails/PetDetailPage?id=${pet?.id}&isPublic=true&userId=${pet.user_id}`
        )
      }
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
            position: "absolute",
            top: 12,
            right: 10,
            flexDirection: "row",
            gap: 10,
          }}
        >
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
        </View>

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
                {pet?.pet_name.charAt(0).toUpperCase() + pet?.pet_name.slice(1)}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="star-outline" color={Colors.secondary} size={12} />
                <Icon name="star-outline" color={Colors.secondary} size={12} />
                <Text style={[style.b10, { color: Colors.secondary }]}>
                  {pet.pet_breed.charAt(0).toUpperCase() +
                    pet.pet_breed.slice(1)}
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={[style.b16, { color: Colors.secondary }]}>
                {pet?.color.charAt(0).toUpperCase() + pet.color.slice(1)}
              </Text>
              <Text style={[style.b10, { color: Colors.secondary }]}>
                {pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default RecentPetCard;
