import React from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  View,
  Dimensions,
} from "react-native";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import Title from "../Title/Title";
import { useTheme } from "../../helper/themeProvider";

const PetTips = () => {
  const { width, height } = Dimensions.get("screen");
  const { isDarkMode } = useTheme();

  return (
    <>
      <Title title="Pet Tips" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={require("../../../assets/images/t5.png")}
            resizeMode="stretch"
            style={{ height: height / 5.8 }}
          ></ImageBackground>
          <Text
            style={[
              style.b14,
              {
                color: isDarkMode ? Colors.secondary : Colors.active,
                marginTop: 10,
                paddingLeft: 5,
              },
            ]}
          >
            Mystery of cat’s food…
          </Text>
          <Text
            style={[
              style.r14,
              {
                color: isDarkMode ? Colors.secondary : Colors.disable,
                paddingLeft: 5,
              },
            ]}
          >
            Lorem ipsum dolor sit amet consectets…
          </Text>
        </View>

        <View style={{ margin: 8 }}></View>

        <View style={{ flex: 1 }}>
          <ImageBackground
            source={require("../../../assets/images/t6.png")}
            resizeMode="stretch"
            style={{ height: height / 5.8 }}
          ></ImageBackground>
          <Text
            style={[
              style.b14,
              {
                color: isDarkMode ? Colors.secondary : Colors.active,
                marginTop: 10,
                paddingLeft: 5,
              },
            ]}
          >
            Tranning dogs at home
          </Text>
          <Text
            style={[
              style.r14,
              {
                color: isDarkMode ? Colors.secondary : Colors.disable,
                paddingLeft: 5,
              },
            ]}
          >
            Lorem ipsum dolor sit amet consectets…
          </Text>
        </View>
      </View>
      <View
        style={{ flexDirection: "row", marginTop: 16, paddingHorizontal: 20 }}
      >
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={require("../../../assets/images/t7.png")}
            resizeMode="stretch"
            style={{ height: height / 5.8 }}
          ></ImageBackground>
          <Text
            style={[
              style.b14,
              {
                color: isDarkMode ? Colors.secondary : Colors.active,
                marginTop: 10,
                paddingLeft: 5,
              },
            ]}
          >
            Vaccination for cats…
          </Text>
          <Text
            style={[
              style.r14,
              {
                color: isDarkMode ? Colors.secondary : Colors.disable,
                paddingLeft: 5,
              },
            ]}
          >
            Lorem ipsum dolor sit amet consectets…
          </Text>
        </View>

        <View style={{ margin: 8 }}></View>

        <View style={{ flex: 1 }}>
          <ImageBackground
            source={require("../../../assets/images/t8.png")}
            resizeMode="stretch"
            style={{ height: height / 5.8 }}
          ></ImageBackground>
          <Text
            style={[
              style.b14,
              {
                color: isDarkMode ? Colors.secondary : Colors.active,
                marginTop: 10,
                paddingLeft: 5,
              },
            ]}
          >
            Small pet sleep
          </Text>
          <Text
            style={[
              style.r14,
              {
                color: isDarkMode ? Colors.secondary : Colors.disable,
                paddingLeft: 5,
              },
            ]}
          >
            Lorem ipsum dolor sit amet consectets…
          </Text>
        </View>
      </View>
    </>
  );
};

export default PetTips;
