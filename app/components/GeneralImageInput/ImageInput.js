import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../theme/color";
import { useVideoPlayer, VideoView } from "expo-video";
import Loader from "../Loader/Loader";

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
        onSelectMedia(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error picking media", error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
