import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../theme/color";
import style from "../theme/style";
import { useRouter } from "expo-router";
import AppTitle from "../components/AppTitle/AppTitle";
import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import AppFormField from "../components/forms/AppFormFeild";
import * as Yup from "yup";
import SubmitButton from "../components/forms/SubmitButton";
import authService from "../services/authService";
import Loader from "../components/Loader/Loader";
import { useTheme } from "../helper/themeProvider";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const validationSchema = Yup.object({
  email: Yup.string().required().email().label("Email"),
});

export default function ForgotPass() {
  const { isDarkMode } = useTheme();
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSend = async (userInfo) => {
    try {
      setIsLoading(true);
      await authService.forgotPassword({ email: userInfo?.email });
      router.push(
        `/Authentication/EmailVerify?email=${
          userInfo?.email
        }&newPass=${true}`
      );
    } catch (error) {
      setError(error.message);
      setErrorVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        style.area,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary, paddingTop: 10 },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <Loader isLoad={isLoading} />
        <View style={[style.main, { backgroundColor: isDarkMode ? Colors.active : Colors.secondary }]}>
          <AppTitle title={"Forgot Password"} style={style} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={[style.r14, { color: isDarkMode ? Colors.secondary : Colors.disable1, marginTop: 20 }]}
            >
              Please enter your email address . You will receive a code to
              create a new password via email.
            </Text>
            <AppForm
              initialValues={{ email: "" }}
              onSubmit={handleSend}
              validationSchema={validationSchema}
            >
              <AppErrorMessage error={error} visible={errorVisible} />

              <AppFormField name={"email"} placeholder="EMAIL" style={style} />
              <SubmitButton title="SEND" style={style} />
            </AppForm>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
