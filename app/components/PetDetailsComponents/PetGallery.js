import React from "react";
import {
  View,
  Image,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import { useTheme } from "../../helper/themeProvider";
import petEdit from "../../../assets/images/pets/petEdit.png";

const { height, width } = Dimensions.get("window");

const PhotoGallery = ({ photos = [], router, pet }) => {
  const { isDarkMode } = useTheme();
  const totalPhotos = photos.length;
  const remainingCount = totalPhotos > 4 ? totalPhotos - 3 : 0;

  const handleMorePress = () => {
    Alert.alert("More Photos", `You have ${remainingCount} more photos!`);
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
            router.push({
              pathname: "/PetDetails/PetEditForms/PetAddPhotos",
              params: { pet: JSON.stringify(pet) },
            })
          }
        >
          <Image source={petEdit} style={{ width: 20, height: 20 }} />
        </Pressable>
      </View>
      <View style={styles.container}>
        {/* Render first 3 images */}
        {photos.slice(0, 3).map((photo, index) => (
          <View key={index} style={index % 2 !== 0 ? styles.spacing : null}>
            <Image source={photo} resizeMode="stretch" style={styles.image} />
          </View>
        ))}

        {/* 4th Image - Shows More Count */}
        {remainingCount > 0 && (
          <TouchableOpacity onPress={handleMorePress} style={styles.spacing}>
            <ImageBackground
              source={photos[3]}
              resizeMode="stretch"
              style={styles.image}
            >
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>+{remainingCount}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}

        {/* Show the 4th image normally if total images are exactly 4 */}
        {totalPhotos === 4 && (
          <View style={styles.spacing}>
            <Image
              source={photos[3]}
              resizeMode="stretch"
              style={styles.image}
            />
          </View>
        )}
      </View>
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
  },
  image: {
    height: height / 12,
    width: width / 5,
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
});

export default PhotoGallery;
