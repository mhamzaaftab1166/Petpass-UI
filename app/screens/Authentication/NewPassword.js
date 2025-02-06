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
import { useLocalSearchParams, useRouter } from "expo-router";
import AppTitle from "../../components/AppTitle";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import AppErrorMessage from "../../components/forms/AppErrorMessage";
import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormFeild";
import SubmitButton from "../../components/forms/SubmitButton";
import * as Yup from "yup";
import userService from "../../services/userService";
import Loader from "../../components/Loader";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const validationSchema = Yup.object({
  password: Yup.string().required().min(5).label("Password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .label("Confirm Password"),
});

export default function NewPass() {
  const router = useRouter();
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { email } = useLocalSearchParams();

  const handleSubmit = async (userInfo) => {
    try {
      setIsLoading(true);
      await userService.resetPassword({ email, password: userInfo.password });
      router.push("/screens/Authentication/Login");
    } catch (error) {
      setErrorVisible(true);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
        <Loader isLoad={isLoading} />
        <View style={[style.main, { backgroundColor: Colors.secondary }]}>
          <AppTitle title={"New Password"} style={style} />

          <ScrollView showsVerticalScrollIndicator={false}>
            <AppForm
              initialValues={{ password: "", confirmPassword: "" }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <AppErrorMessage error={error} visible={errorVisible} />

              <AppFormField
                name={"password"}
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
              <AppFormField
                name={"confirmPassword"}
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
              <SubmitButton title="CHANGE PASSWORD" style={style} />
            </AppForm>
         
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
