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
import React, { useState } from "react";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import { useRouter } from "expo-router";
import AppTitle from "../../components/AppTitle";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function NewPass() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
          <AppTitle title={"New Password"} style={style} />

          <ScrollView showsVerticalScrollIndicator={false}>
            <AppInput
              placeholder="NEW PASSWORD"
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
              placeholder="CONFIRM PASSWORD"
              style={style}
              isPassword={true}
              parentStyles={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
            />

            <AppButton
              title="CHANGE PASSWORD"
              onPress={() => router.push("/screens/Authentication/Login")}
              style={style}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
