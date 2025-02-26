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
import Loader from "../Loader/Loader";
import AppErrorMessage from "../forms/AppErrorMessage";
import petServices from "../../services/petServices";

const { width, height } = Dimensions.get("window");
const IMAGE_SIZE = width / 2 - 10;

const PetImageListing = () => {
  const { photos, pet } = useLocalSearchParams();
  const Images = photos ? JSON.parse(photos) : [];
  const petData = pet ? JSON.parse(pet) : {};
  const { isDarkMode } = useTheme();
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleDelete = async (item) => {
    try {
      setIsLoading(true);
      await petServices.deleteImage(item?.id, petData?.id);
       router.push(`/PetDetails/PetDetailPage?id=${petData?.id}`);
    } catch (error) {
      setErrorVisible(true);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeScreen
      style={[
        style.area,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >
      <Loader isLoad={isLoading} />
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
        <AppErrorMessage error={error} visible={errorVisible} />
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
                    resizeMode="cover"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => handleDelete(item)}
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
          <Image
            resizeMode="cover"
            source={{ uri: selectedImage }}
            style={styles.fullImage}
          />
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
