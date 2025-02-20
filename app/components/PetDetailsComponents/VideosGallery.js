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
    <TouchableWithoutFeedback
      onPress={handlePress}
    >
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

const VideoGallery = ({ videos = [], router }) => {
  const { isDarkMode } = useTheme();
  const totalVideos = videos.length;
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
          onPress={() => router.push("/PetDetails/PetEditForms/PetAddVideos")}
        >
          <Image source={petEdit} style={{ width: 20, height: 20 }} />
        </Pressable>
      </View>
      <View style={styles.container}>
        {videos.slice(0, 3).map((video, index) => (
          <View key={index} style={index % 2 !== 0 ? styles.spacing : null}>
            <VideoItem  videoUrl={video} />
          </View>
        ))}

        {remainingCount > 0 && (
          <TouchableOpacity onPress={handleMorePress} style={styles.spacing}>
            <View style={styles.videoWrapper}>
              <VideoItem videoUrl={videos[3]} onPress={handleMorePress} />
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>+{remainingCount}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {totalVideos === 4 && (
          <View style={styles.spacing}>
            <VideoItem videoUrl={videos[3]} />
          </View>
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
