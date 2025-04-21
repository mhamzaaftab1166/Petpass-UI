// components/IntroItem/IntroItem.js
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { Colors } from "../../theme/color";
import style from "../../theme/style";

const { width, height } = Dimensions.get("screen");

export default function IntroItem({ item, onSkip }) {
  return (
    <SafeAreaView style={{ width, backgroundColor: Colors.secondary }}>
      <StatusBar backgroundColor="transparent" translucent />
      <View style={{ flex: 2.4, backgroundColor: Colors.secondary }}>
        <ImageBackground
          source={item.bg}
          resizeMode="stretch"
          style={{ width, height: height / 1.4 }}
        >
          <ImageBackground
            source={item.img}
            resizeMode="stretch"
            style={{ width, height: height / 1.4 }}
          >
            <View
              style={{
                marginHorizontal: 15,
                alignItems: "flex-end",
                marginTop: 30,
              }}
            >
              <TouchableOpacity onPress={onSkip}>
                <Text style={[style.r16, { color: Colors.secondary }]}>
                  Skip
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                marginHorizontal: 20,
                justifyContent: "flex-end",
                marginBottom: -30,
              }}
            >
              <Text
                style={[
                  style.subtitle,
                  { textAlign: "center", color: Colors.primary },
                ]}
              >
                {item.title1}
              </Text>
              <View style={{ paddingTop: 15 }}>
                <Text
                  style={[
                    style.r16,
                    {
                      color: Colors.active,
                      textAlign: "center",
                      fontFamily: "Avenir-Regular",
                      padding: 20,
                    },
                  ]}
                >
                  {item.subtitle}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
