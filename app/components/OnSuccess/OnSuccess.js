import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../theme/color";
import { useTheme } from "../../helper/themeProvider";
import { useRouter } from "expo-router";

const OnSuccess = ({ title = "Pet",route }) => {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >
      <Image
        source={require("../../../assets/images/success.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text
        style={[
          styles.text,
          {
            color: isDarkMode ? Colors.secondary : Colors.active,
            marginTop: 30,
          },
        ]}
      >
        Your {title} added
      </Text>
      <Text
        style={[
          styles.text,
          {
            color: isDarkMode ? Colors.secondary : Colors.lable,
            marginTop: 10,
          },
        ]}
      >
        Check on the Dashboard
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(route)}
      >
        <Text style={styles.buttonText}>Go to My Pets</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    fontFamily: "Avenir-Bold",
  },
  button: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    paddingVertical: 12,
    height: 44,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    marginBottom: "8%",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Avenir-Bold",
    color: Colors.white,
  },
});
