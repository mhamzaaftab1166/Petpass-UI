import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Alert,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import petEdit from "../../../assets/images/pets/petEdit.png";
import { useTheme } from "../../helper/themeProvider";

const { height, width } = Dimensions.get("window");

const VideoItem = ({ videoUrl, onPress }) => {
  // Create a video player with looping enabled
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      if (isPlaying) {
        player.pause();
      } else {
        player.play();
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen={true}
        allowsPictureInPicture
        nativeControls={true}
      />
    </TouchableWithoutFeedback>
  );
};

const VideoGallery = ({ videos = [], router, pet }) => {
  const { isDarkMode } = useTheme();
  const formattedVideos = videos.map((videoObj) => videoObj.video_url);
  const totalVideos = formattedVideos.length;
  const remainingCount = totalVideos > 4 ? totalVideos - 3 : 0;

  const handleMorePress = () => {
    Alert.alert("More Videos", `You have ${remainingCount} more videos!`);
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
          Videos
        </Text>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/PetDetails/PetEditForms/PetAddVideos",
              params: { pet: JSON.stringify(pet) },
            })
          }
        >
          <Image source={petEdit} style={{ width: 20, height: 20 }} />
        </Pressable>
      </View>
      <View style={styles.container}>
        {totalVideos === 0 ? (
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
            No Videos Added Yet.
          </Text>
        ) : (
          <>
            {formattedVideos.slice(0, 3).map((videoUrl, index) => (
              <View key={index} style={index % 2 !== 0 ? styles.spacing : null}>
                <VideoItem videoUrl={videoUrl} />
              </View>
            ))}

            {remainingCount > 0 && (
              <TouchableOpacity
                onPress={handleMorePress}
                style={styles.spacing}
              >
                <View style={styles.videoWrapper}>
                  <VideoItem
                    videoUrl={formattedVideos[3]}
                    onPress={handleMorePress}
                  />
                  <View style={styles.overlay}>
                    <Text style={styles.overlayText}>+{remainingCount}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}

            {totalVideos === 4 && (
              <View style={styles.spacing}>
                <VideoItem videoUrl={formattedVideos[3]} />
              </View>
            )}
          </>
        )}
      </View>
      <View style={[style.divider, { marginTop: 20 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  video: {
    height: height / 12,
    width: width / 5,
    backgroundColor: "#000",
    borderRadius: 10,
  },
  videoWrapper: {
    position: "relative",
    borderRadius: 20,
  },
  spacing: {
    marginHorizontal: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
  },
  overlayText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default VideoGallery;
