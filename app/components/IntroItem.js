import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StatusBar,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import style from "../theme/style";
import { Colors } from "../theme/color";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

export default function IntroItem({ item }) {
  const router = useRouter();

  return (
    <SafeAreaView style={{ width: width, backgroundColor: Colors.secondary }}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <View style={{ flex: 2.4, backgroundColor: Colors.secondary }}>
        <ImageBackground
          source={item.bg}
          resizeMode="stretch"
          style={{ width: width, height: height / 1.4 }}
        >
          <ImageBackground
            source={item.img}
            resizeMode="stretch"
            style={{ width: width, height: height / 1.4 }}
          >
            <View
              style={{
                marginHorizontal: 15,
                alignItems: "flex-end",
                marginTop: 30,
              }}
            >
              <TouchableOpacity
                onPress={() => router.push("/Authentication/Login")}
              >
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
                    { color: Colors.active, textAlign: "center" },
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
