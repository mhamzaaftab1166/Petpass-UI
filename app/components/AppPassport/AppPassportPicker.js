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
import * as FileSystem from "expo-file-system"; // Import FileSystem for size checking
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

  // New states for file size error alert
  const [sizeAlertVisible, setSizeAlertVisible] = useState(false);
  const [sizeAlertMessage, setSizeAlertMessage] = useState("");

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

  // Function to check file size (returns true if size is less than 2MB)
  const checkFileSize = async (uri) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      // 2 MB = 2 * 1024 * 1024 bytes
      if (fileInfo.size && fileInfo.size > 2 * 1024 * 1024) {
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error checking file size", error);
      // In case of error, let the file pass (or handle accordingly)
      return true;
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
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        const isValidSize = await checkFileSize(uri);
        if (!isValidSize) {
          setSizeAlertMessage("Image/document should be less than 2 MB");
          setSizeAlertVisible(true);
          return;
        }
        onSelectPassport(uri);
      }
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
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        const isValidSize = await checkFileSize(uri);
        if (!isValidSize) {
          setSizeAlertMessage("Image/document should be less than 2 MB");
          setSizeAlertVisible(true);
          return;
        }
        onSelectPassport(uri);
      }
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
        const isValidSize = await checkFileSize(fileUri);
        if (!isValidSize) {
          setSizeAlertMessage("Image/document should be less than 2 MB");
          setSizeAlertVisible(true);
          return;
        }
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
          <Text style={styles.buttonText}>
            {isLoading ? "Loading..." : "File"}
          </Text>
        </Pressable>
      </View>

      {/* Permission Alert */}
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

      {/* File Size Error Alert */}
      {sizeAlertVisible && (
        <AppAlert
          showAlert={sizeAlertVisible}
          showProgress={false}
          title="File Size Error"
          message={sizeAlertMessage}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor={Colors.primary}
          onConfirmPressed={() => setSizeAlertVisible(false)}
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
    marginTop: 30,
  },
  image: {
    width: "100%",
    height: "100%",
    marginTop: 20,
  },
  placeholderText: {
    color: Colors.placeholder || "#aaa",
    fontSize: 14,
  },
  titleText: {
    fontSize: 16,
    fontFamily: "Avenir-Bold",
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
    backgroundColor: Colors.active,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginHorizontal: 5,
    textAlign: "center",
    width: "30%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Avenir-Regular",
  },
  loaderContainer: {
    marginTop: 10,
  },
});

export default AppPassportPicker;
