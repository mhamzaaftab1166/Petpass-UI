import React from "react";
import {
  View,
  Image,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import { useTheme } from "../../helper/themeProvider";
import { Feather } from "@expo/vector-icons"; // Import Expo icon
import petEdit from "../../../assets/images/pets/petEdit.png";

const { height, width } = Dimensions.get("window");

const PhotoGallery = ({ photos = [], router, pet, isEdit }) => {
  const { isDarkMode } = useTheme();
  const totalPhotos = photos.length;
  const remainingCount = totalPhotos > 4 ? totalPhotos - 3 : 0;

  const handleMorePress = () => {
    router.push({
      pathname: "/components/PetDetailsComponents/PetImageListing",
      params: { photos: JSON.stringify(photos), pet: JSON.stringify(pet) },
    });
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={[
            style.s16,
            {
              color: isDarkMode ? Colors.secondary : Colors.active,
              fontFamily: "Avenir-Bold",
            },
          ]}
        >
          {"Photos"}
        </Text>
        <Pressable
          onPress={() =>
            router.replace({
              pathname: "/PetDetails/PetEditForms/PetAddPhotos",
              params: { pet: JSON.stringify(pet) },
            })
          }
        >
          {isEdit && (
            <Image source={petEdit} style={{ width: 20, height: 20 }} />
          )}
        </Pressable>
      </View>

      {totalPhotos === 0 ? (
        <Text
          style={[
            style.r16,
            {
              color: isDarkMode ? Colors.secondary : Colors.disable,
              marginTop: 10,
              fontFamily: "Avenir-Regular",
            },
          ]}
        >
          No Photos Added Yet.
        </Text>
      ) : (
        <View style={styles.container}>
          {photos.slice(0, 3).map((photo, index) => (
            <View key={index} style={index % 2 !== 0 ? styles.spacing : null}>
              <Image
                source={{ uri: photo.image_url }}
                resizeMode="cover"
                style={styles.image}
              />
            </View>
          ))}

          {totalPhotos >= 4 ? (
            <TouchableOpacity onPress={handleMorePress} style={styles.spacing}>
              <ImageBackground
                source={{ uri: photos[3]?.image_url }} // Use the image_url key here
                resizeMode="cover"
                style={[styles.image, { borderRadius: 10 }]}
              >
                <View style={styles.overlay}>
                  <Text style={styles.overlayText}>+{remainingCount || 1}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleMorePress}
              style={styles.moreContainer}
            >
              <Feather name="arrow-right" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={[style.divider, { marginTop: 20 }]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: Colors.active,
    marginTop: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
  },
  image: {
    height: height / 12,
    width: width / 5,
    borderRadius: 10,
  },
  spacing: {
    marginHorizontal: 10,
  },
  overlay: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
  },
  overlayText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  moreContainer: {
    width: width / 5,
    height: height / 12,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginLeft:10
  },
});

export default PhotoGallery;
