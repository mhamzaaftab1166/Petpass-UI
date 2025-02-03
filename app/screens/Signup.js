import React, { useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router"; // Import useRouter from expo-router
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../theme/color";
import style from "../theme/style";
import AppButton from "../components/AppButton";
import AppTitle from "../components/AppTitle";
import AppInput from "../components/AppInput";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Signup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter(); // Initialize router

  return (
    <SafeAreaView
      style={[
        style.area,
        { backgroundColor: Colors.secondary, paddingTop: 10 },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, marginHorizontal: 20 }}
        >
          <AppTitle title={"Sign Up"} style={style} />

          <AppInput
            placeholder="USERNAME"
            // onChangeText={(text) => setEmail(text)}
            style={style}
            parentStyles={{ marginTop: 20 }}
          />

          <AppInput
            placeholder="EMAIL"
            // onChangeText={(text) => setEmail(text)}
            style={style}
            parentStyles={{ marginTop: 20 }}
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

          <AppInput
            placeholder="PHONE"
            // onChangeText={(text) => setEmail(text)}
            style={style}
            parentStyles={{ marginTop: 20 }}
          />

          {/* Terms and Conditions Text */}
          <Text style={[style.r14, { color: Colors.disable, marginTop: 20 }]}>
            By clicking Sign up you agree to the following
            <Text style={[style.b14, { color: Colors.primary }]}>
              {" "}
              Terms and Conditions{" "}
            </Text>{" "}
            without reservation
          </Text>

          {/* Sign Up Button */}
          <AppButton
            title="SIGN UP"
            onPress={() => router.push("/screens/EmailVerify")}
            style={style}
          />

          {/* Social Login Options */}
          <Text
            style={[style.r14, { color: Colors.disable, textAlign: "center" }]}
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

          {/* Redirect to Login */}
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
            <TouchableOpacity onPress={() => router.push("/screens/Login")}>
              <Text style={[style.b14, { color: Colors.primary }]}>
                {" "}
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
