import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Pressable,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../theme/color";
import style from "../../theme/style";

const AppImagePicker = ({ imageUri, onSelectImage }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === "granted") {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    };

    requestPermission();
  }, []);

  const askForPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      setHasPermission(true);
    } else {
      Alert.alert(
        "Permission Denied",
        "You need to enable permissions in settings to select an image."
      );
    }
  };

  const selectImage = async () => {
    if (!hasPermission) {
      askForPermission();
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.canceled) onSelectImage(result.assets[0].uri);
    } catch (error) {
      console.log("Error selecting image", error);
    }
  };

  return (
    <View style={styles.center}>
      <TouchableOpacity onPress={selectImage} style={styles.container}>
        {imageUri && (
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{ uri: imageUri }}
          />
        )}
      </TouchableOpacity>
      <Pressable onPress={selectImage}>
        <Text
          style={[
            style.r14,
            { color: Colors.primary, textAlign: "center", marginTop: 10 },
          ]}
        >
          Change Avatar
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },
  container: {
    backgroundColor: Colors.disable,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 100,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default AppImagePicker;
