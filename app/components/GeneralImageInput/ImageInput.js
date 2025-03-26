import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../theme/color";
import { useVideoPlayer, VideoView } from "expo-video";
import AppAlert from "../AppAlert/index";

function VideoPreview({ videoUri }) {
  const player = useVideoPlayer(videoUri, (player) => {
    player.loop = true;
    player.volume = 0;
    player.play();
  });

  return (
    <VideoView
      style={styles.videoPreview}
      player={player}
      allowsFullscreen
      allowsPictureInPicture
      nativeControls
      startsPictureInPictureAutomatically
    />
  );
}

function MediaInput({ mediaUri, onSelectMedia, mediaType = "image" }) {
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
  const MAX_VIDEO_SIZE = 8 * 1024 * 1024; // 5MB in bytes

  const handlePress = () => {
    if (!mediaUri) {
      selectMedia();
    } else {
      Alert.alert("DELETE", "Are you sure to delete this?", [
        { text: "Yes", onPress: onSelectMedia },
        { text: "No" },
      ]);
    }
  };

  const selectMedia = async () => {
    try {
      setLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          mediaType === "video"
            ? ImagePicker.MediaTypeOptions.Videos
            : ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      if (!result.canceled) {
        const selectedMedia = result.assets[0];
        const fileSize = selectedMedia.uri
          ? await getFileSize(selectedMedia.uri)
          : 0;

        if (mediaType === "video" && fileSize > MAX_VIDEO_SIZE) {
          setAlertMessage("Video file size exceeds the 8MB limit.");
          setAlertVisible(true);
          return;
        }

        if (mediaType === "image" && fileSize > MAX_IMAGE_SIZE) {
          setAlertMessage("Image file size exceeds the 2MB limit.");
          setAlertVisible(true);
          return;
        }

        onSelectMedia(selectedMedia.uri);
      }
    } catch (error) {
      console.log("Error picking media", error);
    } finally {
      setLoading(false);
    }
  };

  const getFileSize = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob.size;
    } catch (error) {
      console.log("Error fetching file size", error);
      return 0;
    }
  };

  return (
    <View style={styles.containerWrapper}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
          {loading && <ActivityIndicator size="large" color={Colors.active} />}
          {!loading && !mediaUri && (
            <MaterialCommunityIcons
              size={40}
              name={mediaType === "video" ? "video" : "camera"}
              color={Colors.active}
            />
          )}
          {!loading && mediaUri && mediaType === "image" && (
            <Image style={styles.image} source={{ uri: mediaUri }} />
          )}
          {!loading && mediaUri && mediaType === "video" && (
            <VideoPreview videoUri={mediaUri} />
          )}
        </View>
      </TouchableWithoutFeedback>

      {/* Display AppAlert only when the alert is visible */}
      {alertVisible && (
        <AppAlert
          showAlert={alertVisible}
          showProgress={false}
          title="Error"
          message={alertMessage}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor={Colors.primary}
          onCancelPressed={() => setAlertVisible(false)}
          onConfirmPressed={() => setAlertVisible(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
  container: {
    backgroundColor: Colors.light,
    borderRadius: 15,
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
  videoPreview: {
    width: "100%",
    height: "100%",
  },
});

export default MediaInput;
