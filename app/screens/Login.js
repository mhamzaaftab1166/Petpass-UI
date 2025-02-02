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

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Login() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
            <Text style={[style.title, { marginTop: 50 }]}>Sign In</Text>

            <View style={[style.txtinput, { marginTop: 30 }]}>
              <TextInput
                placeholder="EMAIL"
                selectionColor={Colors.primary}
                placeholderTextColor={Colors.lable}
                style={[style.r16, { color: Colors.active, flex: 1 }]}
              />
            </View>

            <View
              style={[
                style.txtinput,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 20,
                },
              ]}
            >
              <TextInput
                placeholder="PASSWORD"
                selectionColor={Colors.primary}
                secureTextEntry={!isPasswordVisible}
                placeholderTextColor={Colors.lable}
                style={[style.r16, { color: Colors.active, flex: 1 }]}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Icon
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  color={Colors.disable}
                  size={20}
                />
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: "flex-end", marginTop: 10 }}>
              <TouchableOpacity onPress={() => router.push("/forgot-password")}>
                <Text style={[style.r14, { color: Colors.disable }]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ paddingVertical: 50 }}>
              <TouchableOpacity
                onPress={() => router.push("/home")}
                style={style.btn}
              >
                <Text style={style.btntxt}>SIGN IN</Text>
              </TouchableOpacity>
            </View>

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
