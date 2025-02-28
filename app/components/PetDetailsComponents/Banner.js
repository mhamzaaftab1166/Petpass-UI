import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AppBar, HStack } from "@react-native-material/core";
import { TouchableOpacity } from "react-native";
import { Colors } from "../../theme/color";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const Banner = ({ router, profileImg }) => {
  return (
    <View>
      <ImageBackground
        source={{ uri: profileImg }}
        resizeMode="stretch"
        style={{ width, height: height / 3.2 }}
      >
        <AppBar
          style={{
            backgroundColor: "transparent",
            marginTop: 35,
            marginHorizontal: 20,
            justifyContent: "center",
          }}
          elevation={0}
          leading={
            <TouchableOpacity
              onPress={() => router.replace("/MyAccount/screens/MyPets")}
            >
              <Ionicons
                name="chevron-back"
                color={Colors.secondary}
                size={30}
              />
            </TouchableOpacity>
          }
          trailing={
            <HStack style={{ gap: 10 }}>
              <MaterialIcons
                name="download"
                color={Colors.secondary}
                size={30}
                style={{ marginRight: 10 }}
              />
              <Ionicons
                name="share-social-sharp"
                color={Colors.secondary}
                size={30}
              />
            </HStack>
          }
        />
      </ImageBackground>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({});
