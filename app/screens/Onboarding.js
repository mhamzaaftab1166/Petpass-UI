import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import style from "../theme/style";
import { Colors } from "../theme/color";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Onboarding() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{ width: width, backgroundColor: Colors.secondary, flex: 1 }}
    >
      <StatusBar backgroundColor="transparent" translucent={true} />
      <View style={{ flex: 2.4, backgroundColor: Colors.secondary }}>
        <ImageBackground
          source={require("../../assets/images/authentication/Onbor3.png")}
          resizeMode="stretch"
          style={{ width: width, height: height / 1.4 }}
        >
          <ImageBackground
            source={require("../../assets/images/authentication/onbg.png")}
            resizeMode="stretch"
            style={{ width: width, height: height / 1.4 }}
          >
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
                Booking is easy and simple
              </Text>
              <View style={{ paddingTop: 15 }}>
                <Text
                  style={[
                    style.r16,
                    { color: Colors.active, textAlign: "center" },
                  ]}
                >
                  Easy booking doesn’t cost you much time
                </Text>
              </View>
            </View>
          </ImageBackground>
        </ImageBackground>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: 20,
            marginHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={style.btn}
            onPress={() => router.push("/screens/Login")}
          >
            <Text style={style.btntxt}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
