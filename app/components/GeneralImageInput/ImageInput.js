import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../theme/color";

// Import expo-video hooks and components
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

function VideoPreview({ videoUri }) {
  const player = useVideoPlayer(videoUri, (player) => {
    player.loop = true;
    player.volume = 0; // Mute the preview
    player.play();
  });

  // We disable fullscreen, PiP, and native controls in preview mode
  return (
    <VideoView
      style={styles.videoPreview}
      player={player}
      allowsFullscreen={false}
      allowsPictureInPicture={false}
      nativeControls={false}
    />
  );
}

function MediaInput({ mediaUri, onSelectMedia, mediaType = "image" }) {
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
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          mediaType === "video"
            ? ImagePicker.MediaTypeOptions.Videos
            : ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.canceled) onSelectMedia(result.assets[0].uri);
    } catch (error) {
      console.log("Error picking media", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!mediaUri && (
          <MaterialCommunityIcons
            size={40}
            name={mediaType === "video" ? "video" : "camera"}
            color={Colors.active}
          />
        )}
        {mediaUri && mediaType === "image" && (
          <Image style={styles.image} source={{ uri: mediaUri }} />
        )}
        {mediaUri && mediaType === "video" && (
          <VideoPreview videoUri={mediaUri} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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
