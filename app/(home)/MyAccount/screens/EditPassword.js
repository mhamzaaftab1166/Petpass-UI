import {
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
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

const validationSchema = Yup.object({
  current_password: Yup.string().required().label("Current Password"),
  new_password: Yup.string().required().min(5).label("New Password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("new_password"), null], "New Password must match")
    .label("New Password"),
});

export default function EditPassword() {
  const router = useRouter();

  return (
    <SafeAreaView style={[style.area, { backgroundColor: Colors.secondary }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <View
          style={[
            style.main,
            { backgroundColor: Colors.secondary, marginTop: 10 },
          ]}
        >
          <AppBar
            color={Colors.secondary}
            title="Password"
            titleStyle={[style.apptitle, { color: Colors.active }]}
            centerTitle={true}
            elevation={0}
            leading={
              <TouchableOpacity onPress={() => router.back()}>
                <Icon name="chevron-back" color={Colors.active} size={25} />
              </TouchableOpacity>
            }
          />

          <AppForm
            initialValues={{
              current_password: "",
              new_password: "",
              confirm_password:"",
            }}
            onSubmit={(values) => console.log(values)
            }
            validationSchema={validationSchema}
          >
            <AppErrorMessage error={""} visible={false} />
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
