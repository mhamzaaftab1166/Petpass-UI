import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  StatusBar,
  Platform,
} from "react-native";
import { Colors } from "../../../theme/color";

const { width, height } = Dimensions.get("window");

export default function FilterDrawer({ visible, onClose }) {
  const drawerAnim = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    Animated.timing(drawerAnim, {
      toValue: visible ? 0 : width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  const statusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight-10 || 0 : 44;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{ translateX: drawerAnim }],
              paddingTop: statusBarHeight + 10,
            },
          ]}
        >
          <Text style={styles.drawerTitle}>Filter Options</Text>
          <Text style={styles.filterOption}>Option 1</Text>
          <Text style={styles.filterOption}>Option 2</Text>
          <Text style={styles.filterOption}>Option 3</Text>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: height,
    width: width,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  drawer: {
    height: "100%",
    width: width * 0.8,
    backgroundColor: Colors.secondary,
    padding: 20,
    paddingTop: 0,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: Colors.active,
  },
  filterOption: {
    fontSize: 16,
    marginVertical: 8,
    color: Colors.active,
  },
});
