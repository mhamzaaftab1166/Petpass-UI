import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Colors } from "../../theme/color";
import AppAlert from "../AppAlert/index";
import { Linking } from "react-native";

const AppPassportPicker = ({
  passportUri,
  pickerName = "Upload Passport By:",
  onSelectPassport,
}) => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [permissionAlertVisible, setPermissionAlertVisible] = useState(false);
  const [permissionMessage, setPermissionMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loader state

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const redirectToSettings = () => {
    Linking.openSettings();
    setPermissionAlertVisible(false);
  };

  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      setPermissionMessage(
        "You need to enable gallery permissions in settings to select an image."
      );
      setPermissionAlertVisible(true);
    } else {
      setHasGalleryPermission(true);
    }
  };

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      setPermissionMessage(
        "You need to enable camera permissions in settings to take a photo."
      );
      setPermissionAlertVisible(true);
    } else {
      setHasCameraPermission(true);
    }
  };

  const pickFromGallery = async () => {
    if (!hasGalleryPermission) {
      await requestGalleryPermission();
      return;
    }
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.canceled) onSelectPassport(result.assets[0].uri);
    } catch (error) {
      console.log("Error picking image from gallery", error);
    }
  };

  const pickFromCamera = async () => {
    if (!hasCameraPermission) {
      await requestCameraPermission();
      return;
    }
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.canceled) onSelectPassport(result.assets[0].uri);
    } catch (error) {
      console.log("Error picking image from camera", error);
    }
  };

  const pickFile = async () => {
    setIsLoading(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: false,
      });
      console.log("DocumentPicker result:", result);
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const fileUri = result.assets[0].uri;
        onSelectPassport(fileUri);
      } else {
        console.log("Document picking cancelled or not successful");
      }
    } catch (error) {
      console.error("Error picking file", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.center}>
      <TouchableOpacity onPress={pickFromGallery} style={styles.container}>
        {passportUri ? (
          <Image
            resizeMode="stretch"
            style={styles.image}
            source={{ uri: passportUri }}
          />
        ) : (
          <Text style={styles.placeholderText}>No Passport Selected</Text>
        )}
      </TouchableOpacity>
      <Text style={[styles.titleText, { marginVertical: 10 }]}>
        {pickerName}
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.optionButton} onPress={pickFromGallery}>
          <Text style={styles.buttonText}>Gallery</Text>
        </Pressable>
        <Pressable style={styles.optionButton} onPress={pickFromCamera}>
          <Text style={styles.buttonText}>Camera</Text>
        </Pressable>
        <Pressable style={styles.optionButton} onPress={pickFile}>
          <Text style={styles.buttonText}>{`${
            isLoading ? "Loading..." : "File"
          }`}</Text>
        </Pressable>
      </View>

      {permissionAlertVisible && (
        <AppAlert
          showAlert={permissionAlertVisible}
          showProgress={false}
          title="Permission Denied"
          message={permissionMessage}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancel"
          confirmText="Access"
          confirmButtonColor={Colors.primary}
          onCancelPressed={() => setPermissionAlertVisible(false)}
          onConfirmPressed={redirectToSettings}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },
  container: {
    backgroundColor: Colors.unSelect,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 400,
    width: "100%",
    overflow: "hidden",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderText: {
    color: Colors.placeholder || "#aaa",
    fontSize: 14,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    textAlign: "center",
    width: "30%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  loaderContainer: {
    marginTop: 10,
  },
});

export default AppPassportPicker;
