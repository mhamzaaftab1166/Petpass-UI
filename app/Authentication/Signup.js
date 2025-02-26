import React, { useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../theme/color";
import style from "../theme/style";
import AppTitle from "../components/AppTitle/AppTitle";
import * as Yup from "yup";
import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import AppFormField from "../components/forms/AppFormFeild";
import SubmitButton from "../components/forms/SubmitButton";
import AppFormPhoneField from "../components/forms/AppFormPhoneFeild";
import AppFormRoleSelector from "../components/forms/AppFormRoleSelector";
import authService from "../services/authService";
import formatRegisterPayload from "../utils/authenticationUtils";
import AuthenticationSuccess from "../ESB/success/authentication.json";
import Loader from "../components/Loader/Loader";
import { useTheme } from "../helper/themeProvider";
import owner from "../../assets/images/authentication/d3.png";
import breeder from "../../assets/images/authentication/breeder.png";
import shop from "../../assets/images/authentication/d2.png";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const validationSchema = Yup.object({
  username: Yup.string().required().label("FULLNAME"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  phone_number: Yup.string().required().min(8).max(15).label("Phone"),
  // profile_types: Yup.array().of(Yup.string().required()).min(1).label("Role"),
});

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState();
  const { isDarkMode } = useTheme();
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (userInfo) => {
    try {
      setIsLoading(true);
      const formattedPayload = formatRegisterPayload(userInfo);

      const data = await authService.register(formattedPayload);
      if (data?.message === AuthenticationSuccess.registrationSuccess) {
        router.push(
          `/Authentication/EmailVerify?email=${formattedPayload.email}&username=${formattedPayload.username}`
        );
      }
    } catch (error) {
      setErrorVisible(true);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const roles = {
    isOne: false,
    data: [
      {
        title: "Owner",
        role: "pet_owner",
        imageSrc: owner,
      },
      {
        title: "Breeder",
        role: "pet_breeder",
        imageSrc: breeder,
      },
      {
        title: "Shop",
        role: "pet_shop",
        imageSrc: shop,
      },
    ],
  };

  return (
    <SafeAreaView
      style={[
        style.area,
        {
          backgroundColor: isDarkMode ? Colors.active : Colors.secondary,
          paddingTop: 10,
        },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <Loader isLoad={isLoading} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, marginHorizontal: 20 }}
        >
          <AppTitle title={"Sign Up"} style={style} />
          <AppForm
            initialValues={{
              email: "",
              password: "",
              username: "",
              phone_number: "",
              // profile_types: [],
            }}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={validationSchema}
          >
            <AppErrorMessage error={error} visible={errorVisible} />
            <AppFormField
              name={"username"}
              placeholder="FULLNAME"
              style={style}
              parentStyles={{ marginTop: 20 }}
            />
            <AppFormField
              name={"email"}
              placeholder="EMAIL"
              style={style}
              parentStyles={{ marginTop: 20 }}
            />
            <AppFormField
              name={"password"}
              placeholder="PASSWORD"
              style={style}
              parentStyles={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
              isPassword={true}
            />

            <AppFormPhoneField style={style} name={"phone_number"} />

            {/* <AppFormRoleSelector roles={roles} name={"profile_types"} /> */}

            <Text
              style={[
                style.r14,
                {
                  color: isDarkMode ? Colors.secondary : Colors.disable,
                  marginTop: 20,
                },
              ]}
            >
              By clicking Sign up you agree to the following
              <Text style={[style.b14, { color: Colors.primary }]}>
                {" "}
                Terms and Conditions{" "}
              </Text>{" "}
              without reservation
            </Text>

            <SubmitButton title="SIGN UP" style={style} />
          </AppForm>

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
            <Text
              style={[
                style.r14,
                { color: isDarkMode ? Colors.secondary : Colors.lable },
              ]}
            >
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/Authentication/Login")}
            >
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

const styles = StyleSheet.create({});
