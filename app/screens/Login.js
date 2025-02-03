import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../theme/color";
import style from "../theme/style";
import { useRouter } from "expo-router";
import AppButton from "../components/AppButton";
import AppTitle from "../components/AppTitle";
import AppInput from "../components/AppInput";
import { useThemeStore } from "../store/useStore";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Login() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={[
        style.area,
        { backgroundColor: Colors.secondary, paddingTop: 10 },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppTitle title={"Sign In"} style={style} />

            <AppInput
              placeholder="EMAIL"
              // onChangeText={(text) => setEmail(text)}
              style={style}
            />
            <AppInput 
              placeholder="PASSWORD"
              style={style}
              isPassword={true}
              parentStyles={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
            />

            <View style={{ alignItems: "flex-end", marginTop: 10 }}>
              <TouchableOpacity onPress={() => router.push("/forgot-password")}>
                <Text style={[style.r14, { color: Colors.disable }]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            <AppButton
              title="SIGN IN"
              onPress={() => router.push("/home")}
              style={style}
            />

            <Text
              style={[
                style.r14,
                { color: Colors.disable, textAlign: "center" },
              ]}
            >
              Contact with
            </Text>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  style.btn1,
                  { marginTop: 30, flex: 1, backgroundColor: "#DC4E41" },
                ]}
              >
                <Image
                  source={require("../../assets/images/authentication/Google.png")}
                  resizeMode="stretch"
                  style={{ width: width / 11, height: height / 35 }}
                />
                <Text style={[style.btntxt1, { color: Colors.secondary }]}>
                  Google
                </Text>
              </TouchableOpacity>
              <View style={{ margin: 10 }} />
              <TouchableOpacity
                style={[
                  style.btn1,
                  { marginTop: 30, flex: 1, backgroundColor: "#385C8E" },
                ]}
              >
                <Image
                  source={require("../../assets/images/authentication/facebook.png")}
                  resizeMode="stretch"
                  style={{ width: width / 25, height: height / 37 }}
                />
                <Text style={[style.btntxt1, { color: Colors.secondary }]}>
                  Facebook
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 10,
                marginTop: 50,
              }}
            >
              <Text style={[style.r14, { color: Colors.lable }]}>
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => router.push("/screens/Signup")}>
                <Text style={[style.b14, { color: Colors.primary }]}>
                  {" "}
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
