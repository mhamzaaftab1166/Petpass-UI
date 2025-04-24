import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const PetBanner = () => {
  const router = useRouter();
  return (
    <View style={{ paddingBottom: 16, paddingHorizontal: 20 }}>
      <ImageBackground
        source={require("../../../assets/images/home/petBanner.png")}
        style={styles.container}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Create Your Pets</Text>
          <Text style={styles.subtitle}>
            Add your furries one & complete their profile today!
          </Text>
          <TouchableOpacity style={styles.button} onPress={() =>
          router.push({
            pathname: "/Add"})}>
            <Text style={styles.buttonText}>Create Pet</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 321,
    borderRadius: 18,
    justifyContent: "flex-end",
    position: "relative",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 12,
    borderBottomLeftRadius: 13,
    padding: 15,
    width: "100%",
    height: 321,
  },
  title: {
    fontSize: 18,
    fontFamily: "Avenir-Bold",
    color: "#F1F1F1",
    marginTop: 29,
    paddingHorizontal: 5,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Avenir-SemiBold",
    marginVertical: 20,
    width: 245,
    lineHeight: 25,
    color: "#ffffff",
    paddingHorizontal: 5,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 8,
    borderRadius: 6,
    paddingHorizontal: 15,
    alignItems: "center",
    width: 121,
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Avenir-Bold",
  },
});

export default PetBanner;
