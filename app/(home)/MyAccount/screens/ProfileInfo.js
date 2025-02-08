import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-paper";
import { Colors } from "../../../theme/color";
import style from "../../../theme/style";
import { useRouter } from "expo-router";
import * as Yup from "yup";
import AppForm from "../../../components/forms/AppForm";
import AppErrorMessage from "../../../components/forms/AppErrorMessage";
import AppFormField from "../../../components/forms/AppFormFeild";
import AppFormPhoneField from "../../../components/forms/AppFormPhoneFeild";
import AppFormRoleSelector from "../../../components/forms/AppFormRoleSelector";
import SubmitButton from "../../../components/forms/SubmitButton";
import { useTheme } from "../../../helper/themeProvider";

const validationSchema = Yup.object({
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  phone_number: Yup.string().required().min(8).max(15).label("Phone"),
  profile_type: Yup.string().required().label("Role"),
});

export default function AccountInfo() {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaView style={[style.area, { backgroundColor:  isDarkMode ? Colors.active : Colors.secondary }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <View
          style={[
            style.main,
            { backgroundColor:  isDarkMode ? Colors.active : Colors.secondary, marginTop: 10 },
          ]}
        >
          <AppBar
            color={isDarkMode ? Colors.active : Colors.secondary}
            title="Account Info"
            titleStyle={[style.b18, { color: isDarkMode ? Colors.secondary : Colors.active }]}
            centerTitle={true}
            elevation={0}
            leading={
              <TouchableOpacity onPress={() => router.back()}>
                <Icon name="chevron-back" color={isDarkMode ? Colors.secondary : Colors.active} size={30} />
              </TouchableOpacity>
            }
          />
          <AppForm
            initialValues={{
              email: "mhamzaaftab1166@gmail.com",
              password: "12345677",
              username: "M HAMZA AFTAB",
              phone_number: "",
              profile_type: "pet_breeder",
            }}
            onSubmit={(values) => console.log(values)}
            validationSchema={validationSchema}
          >
            <AppErrorMessage error={""} visible={false} />
            <Avatar.Image
              source={require("../../../../assets/images/profile/profile.png")}
              size={100}
              style={{
                backgroundColor: Colors.secondary,
                alignSelf: "center",
                marginTop: 15,
              }}
            />
            <Text
              style={[
                style.r14,
                { color: Colors.primary, textAlign: "center", marginTop: 10 },
              ]}
            >
              Change avatar
            </Text>
            <AppFormField
              name={"username"}
              placeholder="USERNAME"
              style={style}
              parentStyles={{ marginTop: 20 }}
            />
            <AppFormField
              name={"email"}
              placeholder="EMAIL"
              style={style}
              editable={false}
              parentStyles={{ marginTop: 20 }}
            />
            <AppFormPhoneField style={style} name={"phone_number"} />

            <AppFormRoleSelector name={"profile_type"} />

            <SubmitButton title="SAVE" style={style} />
          </AppForm>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
