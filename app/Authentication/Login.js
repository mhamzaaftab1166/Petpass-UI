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
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../theme/color";
import style from "../theme/style";
import { useRouter } from "expo-router";
import AppTitle from "../components/AppTitle/AppTitle";
import AppFormField from "../components/forms/AppFormFeild";
import AppForm from "../components/forms/AppForm";
import * as Yup from "yup";
import SubmitButton from "../components/forms/SubmitButton";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import storeage from "../helper/localStorage";
import authService from "../services/authService";
import Loader from "../components/Loader/Loader";
import AuthenticationSuccess from "../ESB/success/authentication.json";
import { useUserStore } from "../store/useStore";
import { localStorageConst } from "../constants/storageConstant";
import Checkbox from "expo-checkbox";
import AppAlert from "../components/AppAlert";
import { useTheme } from "../helper/themeProvider";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const validationSchema = Yup.object({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function Login() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { setToken } = useUserStore();
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (userInfo) => {
    try {
      setIsLoading(true);
      const data = await authService.login(userInfo);
      if (data?.message === AuthenticationSuccess.loginSuccess) {
        await storeage.storeAppData(
          localStorageConst.JWTUSER, data?.accessToken
        );
        await storeage.storeAppData(localStorageConst.REMEMBER, rememberMe)
      }
      setToken(data?.accessToken);
      router.replace("(home)");
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
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary, paddingTop: 10 },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <Loader isLoad={isLoading} />
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppForm
              initialValues={{ email: "", password: "" }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <AppTitle title={"Sign In"} style={style} />
              <AppErrorMessage error={error} visible={errorVisible} />

              <AppFormField name={"email"} placeholder="EMAIL" style={style} />
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

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Checkbox
                  style={styles.checkbox}
                    value={rememberMe}
                    onValueChange={setRememberMe}
                    color={rememberMe ? Colors?.primary : Colors?.border}
                  />
                  <Text style={[style.r14, { color: isDarkMode? Colors.secondary : Colors.disable }]}>
                    Remember Me
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => router.push("/Authentication/ForgotPassword")}
                >
                  <Text style={[style.r14, { color: isDarkMode? Colors.secondary : Colors.disable }]}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              <SubmitButton title="SIGN IN" style={style} />
            </AppForm>
            <Text
              style={[
                style.r14,
                { color: isDarkMode? Colors.secondary : Colors.disable, textAlign: "center" },
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
              <Text style={[style.r14, { color: isDarkMode? Colors.secondary : Colors.lable }]}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/Authentication/Signup")}
              >
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

const styles = StyleSheet.create({
  checkbox: {
    margin: 6,
    borderRadius: 10,
    fontFamily: "Avenir-bold"
  }
});