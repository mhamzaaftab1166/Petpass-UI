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
import { useTheme } from "../../../helper/themeProvider";

const validationSchema = Yup.object({
  email: Yup.string().required().email().label("Email"),
});

export default function EditEmail() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
 
  return (
    <SafeAreaView style={[style.area, {  backgroundColor: isDarkMode ? Colors.active : Colors.secondary,  }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <View
          style={[
            style.main,
            {  backgroundColor: isDarkMode ? Colors.active : Colors.secondary,  marginTop: 10 },
          ]}
        >
          <AppBar
            color={isDarkMode?Colors.active:Colors.secondary}
            title="Email"
            titleStyle={[style.apptitle, { color: isDarkMode?Colors.secondary:Colors.active }]}
            centerTitle={true}
            elevation={0}
            leading={
              <TouchableOpacity onPress={() => router.back()}>
                <Icon name="chevron-back" color={isDarkMode?Colors.secondary: Colors.active} size={25} />
              </TouchableOpacity>
            }
          />

          <AppForm
            initialValues={{
              email:""
            }}
            onSubmit={(values) => console.log(values)}
            validationSchema={validationSchema}
          >
            <AppErrorMessage error={""} visible={false} />
            <AppFormField
              name={"email"}
              placeholder="EMAIL"
              style={style}
              parentStyles={{ marginTop: 20 }}
            />

            <SubmitButton title="CHANGE EMAIL" style={style} />
          </AppForm>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
