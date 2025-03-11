import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("screen");

const Banner = () => {
  const router = useRouter();
  return (
    <ImageBackground
      source={require("../../../assets/images/home/banner1.png")}
      resizeMode="stretch"
      style={{ width, height: height / 3, paddingTop: 40 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 20,
        }}
      >
        <View
          style={[
            style.txtinput,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderColor: Colors.border,
              borderWidth: 1,
              backgroundColor: "#FFFFFF70",
              borderRadius: 10,
              flex: 1,
              paddingHorizontal: 10,
              height: 43,
            },
          ]}
        >
          <TouchableOpacity>
            <Icon name="search" color={Colors.secondary} size={20} />
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            selectionColor={Colors.primary}
            placeholderTextColor={Colors.secondary}
            style={{ color: Colors.secondary, flex: 1, marginHorizontal: 10 }}
          />
        </View>

        {/* Notification Icon */}
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
          onPress={() => router.push("/GeneralScreens/Notifications")}
        >
          <Icon
            name="notifications-outline"
            color={Colors.secondary}
            size={30}
          />
        </TouchableOpacity>

        {/* Cart Icon */}
        {/* <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Icon name="cart-outline" color={Colors.secondary} size={30} />
        </TouchableOpacity> */}
      </View>

      {/* Banner Text */}
      <Text
        style={[
          style.s18,
          {
            color: Colors.secondary,
            marginTop: 50,
            marginLeft: 20,
            fontWeight: 800,
          },
        ]}
      >
        PETPASS
      </Text>
      <View
        style={{
          width: width / 6,
          backgroundColor: Colors.secondary,
          height: 3,
          marginLeft: 20,
          marginTop: 5,
        }}
      />
      <Text
        style={[
          style.title,
          {
            color: Colors.secondary,
            marginTop: 15,
            marginLeft: 20,
            fontSize: 28,
          },
        ]}
      >
        LOVE YOUR PET
      </Text>
    </ImageBackground>
  );
};

export default Banner;

const styles = StyleSheet.create({});
