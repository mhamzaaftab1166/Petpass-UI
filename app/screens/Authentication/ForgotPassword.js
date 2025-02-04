import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import { useRouter } from "expo-router";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import AppTitle from "../../components/AppTitle";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function ForgotPass() {
  const router = useRouter();

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
        <View style={[style.main, { backgroundColor: Colors.secondary }]}>
          <AppTitle title={"Forgot Password"} style={style} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={[style.r14, { color: Colors.disable1, marginTop: 20 }]}
            >
              Please enter your email address . You will receive a code to
              create a new password via email.
            </Text>

            <AppInput
              placeholder="EMAIL"
              // onChangeText={(text) => setEmail(text)}
              style={style}
            />
            <AppButton
              title="SEND"
              onPress={() => router.push("/screens/EmailVerify")}
              style={style}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
