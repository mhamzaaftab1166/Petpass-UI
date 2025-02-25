import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import SafeScreen from "../SafeScreen/SafeScreen";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../helper/themeProvider";
import { Colors } from "../../theme/color";
import style from "../../theme/style";

const { width, height } = Dimensions.get("window");
const IMAGE_SIZE = width / 2 - 10; // 2 images per row

const PetImageListing = () => {
  const { photos } = useLocalSearchParams();
  const Images = photos ? JSON.parse(photos) : [];
  const { isDarkMode } = useTheme();

  const [selectedImage, setSelectedImage] = useState(null);

  const handleDelete = (imageUrl) => {
    console.log("Deleting image:", imageUrl);
  };

  return (
    <SafeScreen
      style={[
        style.area,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >
      <AppBar
        color={isDarkMode ? Colors.active : Colors.secondary}
        title="Pet Images"
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

      <View style={styles.container}>
        {Images.length === 0 ? (
          <Text style={styles.noImagesText}>No images added yet.</Text>
        ) : (
          <FlatList
            data={Images}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2} // 2 images per row
            renderItem={({ item }) => (
              <View style={styles.imageWrapper}>
                {/* Image Preview */}
                <TouchableOpacity
                  onPress={() => setSelectedImage(item.image_url)}
                >
                  <Image
                    source={{ uri: item.image_url }}
                    style={styles.image}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => handleDelete(item.image_url)}
                >
                  <Icon name="trash" color={Colors.light} size={20} />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>

      <Modal visible={!!selectedImage} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedImage(null)}
          >
            <Icon name="close" size={30} color="#fff" />
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.fullImage} />
        </View>
      </Modal>
    </SafeScreen>
  );
};

export default PetImageListing;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  noImagesText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 10,
  },
  imageWrapper: {
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 10,
  },
  menuButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 15,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: width * 0.9,
    height: height * 0.7,
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 60,
    right: 20,
  },
});
