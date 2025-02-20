import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import MediaInput from "./ImageInput";
function MediaInputList({
  mediaUris = [],
  onAddMedia,
  onRemoveMedia,
  mediaType
}) {
  const scrollViewRef = useRef(null);

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
      >
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

          <MediaInput
            onSelectMedia={(uri) => onAddMedia(uri)}
            mediaType={mediaType}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  media: {
    marginRight: 10,
  },
});

export default MediaInputList;
