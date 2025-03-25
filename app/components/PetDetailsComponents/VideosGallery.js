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
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import petEdit from "../../../assets/images/pets/petEdit.png";
import { useTheme } from "../../helper/themeProvider";
import { MaterialIcons } from "@expo/vector-icons"; // Import right arrow icon

const { height, width } = Dimensions.get("window");

const VideoItem = ({ videoUrl, onPress }) => {
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        nativeControls
      />
    </TouchableOpacity>
  );
};

const VideoGallery = ({ videos = [], router, pet, isEdit }) => {
  const { isDarkMode } = useTheme();
  const formattedVideos = videos.map((videoObj) => videoObj.video_url);
  const totalVideos = formattedVideos.length;
  const remainingCount =
    totalVideos > 4 ? totalVideos - 3 : totalVideos === 4 ? 1 : 0;


  const handleMorePress = () => {
    router.push({
      pathname: "/components/PetDetailsComponents/PetVideosListing",
      params: { videos: JSON.stringify(videos), pet: JSON.stringify(pet) },
    });
  };

  return (
    <View>
      <View style={styles.header}>
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
            router.replace({
              pathname: "/PetDetails/PetEditForms/PetAddVideos",
              params: { pet: JSON.stringify(pet) },
            })
          }
        >
          {isEdit && (
            <Image source={petEdit} style={{ width: 20, height: 20 }} />
          )}
        </Pressable>
      </View>

      {totalVideos === 0 ? (
        <Text style={[style.r16, styles.noVideosText]}>
          No Videos Added Yet.
        </Text>
      ) : (
        <View style={styles.container}>
          {formattedVideos.slice(0, 3).map((videoUrl, index) => (
            <View key={index} style={index % 2 !== 0 ? styles.spacing : null}>
              <VideoItem videoUrl={videoUrl} />
            </View>
          ))}

          {totalVideos >= 4 ? (
            <TouchableOpacity onPress={handleMorePress} style={styles.spacing}>
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
          ) : (
            <TouchableOpacity
              onPress={handleMorePress}
              style={styles.moreContainer}
            >
              <MaterialIcons name="arrow-forward" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={[style.divider, { marginTop: 20 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  noVideosText: {
    color: Colors.disable,
    marginTop: 10,
    fontFamily: "Avenir-Regular",
  },
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
    borderRadius: 10,
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
  moreContainer: {
    width: width / 5,
    height: height / 12,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginLeft: 10,
  },
});

export default VideoGallery;
