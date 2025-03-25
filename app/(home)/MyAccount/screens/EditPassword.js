import {
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import style from "../../../theme/style";
import { Colors } from "../../../theme/color";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import AppFormField from "../../../components/forms/AppFormFeild";
import * as Yup from "yup";
import AppForm from "../../../components/forms/AppForm";
import AppErrorMessage from "../../../components/forms/AppErrorMessage";
import SubmitButton from "../../../components/forms/SubmitButton";
import { useTheme } from "../../../helper/themeProvider";
import userService from "../../../services/userService";
import Loader from "../../../components/Loader/Loader";

const validationSchema = Yup.object({
  current_password: Yup.string().required().label("Current Password"),
  new_password: Yup.string().required().min(5).label("New Password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("new_password"), null], "New Password must match")
    .label("New Password"),
});

export default function EditPassword() {
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isDarkMode } = useTheme();


  const handleSubmit = async ({ current_password, new_password }) => {
    try {
      setIsLoading(true);
      await userService.changePassword({
        currentPassword: current_password,
        newPassword:new_password,
      });
      router.replace("/MyAccount/screens/Security");
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
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <Loader isLoad={isLoading} />
        <View
          style={[
            style.main,
            {
              backgroundColor: isDarkMode ? Colors.active : Colors.secondary,
              marginTop: 10,
            },
          ]}
        >
          <AppBar
            color={isDarkMode ? Colors.active : Colors.secondary}
            title="Password"
            titleStyle={[
              style.apptitle,
              {
                color: isDarkMode ? Colors.secondary : Colors.active,
                fontFamily: "Avenir-Bold",
              },
            ]}
            centerTitle={true}
            elevation={0}
            leading={
              <TouchableOpacity onPress={() => router.back()}>
                <Icon
                  name="chevron-back"
                  color={isDarkMode ? Colors.secondary : Colors.active}
                  size={25}
                />
              </TouchableOpacity>
            }
          />

          <AppForm
            initialValues={{
              current_password: "",
              new_password: "",
              confirm_password: "",
            }}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={validationSchema}
          >
            <AppErrorMessage error={error} visible={errorVisible} />
            <AppFormField
              name={"current_password"}
              placeholder="CURRENT PASSWORD"
              style={style}
              parentStyles={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
              isPassword={true}
            />
            <AppFormField
              name={"new_password"}
              placeholder="NEW PASSWORD"
              style={style}
              parentStyles={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
              isPassword={true}
            />
            <AppFormField
              name={"confirm_password"}
              placeholder="CONFIRM PASSWORD"
              style={style}
              parentStyles={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
              isPassword={true}
            />
            <SubmitButton title="CHANGE PASSWORD" style={style} />
          </AppForm>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
