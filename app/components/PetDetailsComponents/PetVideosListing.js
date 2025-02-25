import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
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
import { useVideoPlayer, VideoView } from "expo-video";

const { width, height } = Dimensions.get("window");
const VIDEO_SIZE = width / 2 - 10;

const VideoItem = ({ videoUrl, onPressDelete, onPressPreview }) => {
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
     player.play();
  });

  return (
    <TouchableOpacity onPress={onPressPreview}>
      <View style={styles.videoWrapper}>
        <VideoView
          style={styles.video}
          player={player}
          nativeControls={false}
          allowsFullscreen={false}
        />
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => onPressDelete(videoUrl)}
        >
          <Icon name="trash" color={Colors.light} size={20} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const VideoModal = ({ videoUrl, onClose }) => {
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <Modal visible={!!videoUrl} transparent={true}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close" size={30} color="#fff" />
        </TouchableOpacity>
        <VideoView
          style={styles.fullVideo}
          player={player}
          nativeControls
          allowsFullscreen
          allowsPictureInPicture
        />
      </View>
    </Modal>
  );
};

const PetVideoListing = () => {
  const { videos } = useLocalSearchParams();
  const Videos = videos ? JSON.parse(videos) : [];
  const { isDarkMode } = useTheme();

  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleDelete = (videoUrl) => {
    console.log("Deleting video:", videoUrl);
  };

  return (
    <SafeScreen
      style={[
        style.area,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >
      <AppBar
        color={isDarkMode ? Colors.active : Colors.secondary}
        title="Pet Videos"
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
        {Videos.length === 0 ? (
          <Text style={styles.noVideosText}>No videos added yet.</Text>
        ) : (
          <FlatList
            data={Videos}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2} // 2 videos per row
            renderItem={({ item }) => (
              <VideoItem
                videoUrl={item.video_url}
                onPressDelete={handleDelete}
                onPressPreview={() => setSelectedVideo(item.video_url)}
              />
            )}
          />
        )}
      </View>

      {selectedVideo && (
        <VideoModal
          videoUrl={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </SafeScreen>
  );
};

export default PetVideoListing;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  noVideosText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 10,
  },
  videoWrapper: {
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  video: {
    width: VIDEO_SIZE,
    height: VIDEO_SIZE,
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
  fullVideo: {
    width: width * 0.9,
    height: height * 0.7,
  },
  closeButton: {
    position: "absolute",
    top: 60,
    right: 20,
  },
});
