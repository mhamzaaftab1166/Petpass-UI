import React from "react";
import { View, StyleSheet } from "react-native";
import MediaInput from "./ImageInput";

function MediaInputList({ mediaUris = [], onAddMedia, onRemoveMedia, mediaType }) {
  return (
    <View style={styles.container}>
      {mediaUris.map((mediaUri) => (
        <View style={styles.media} key={mediaUri}>
          <MediaInput
            mediaUri={mediaUri}
            onSelectMedia={() => onRemoveMedia(mediaUri)}
            mediaType={mediaType}
          />
        </View>
      ))}
      <View style={styles.media}>
        <MediaInput
          onSelectMedia={(uri) => onAddMedia(uri)}
          mediaType={mediaType}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  media: {
    width: "33.33%",
    padding: 5, 
    marginTop:10
  },
});

export default MediaInputList;
