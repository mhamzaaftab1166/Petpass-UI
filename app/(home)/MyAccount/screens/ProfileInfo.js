import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-paper";
import { Colors } from "../../../theme/color";
import { Alert } from "react-native";
import style from "../../../theme/style";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import * as Yup from "yup";
import AppForm from "../../../components/forms/AppForm";
import AppErrorMessage from "../../../components/forms/AppErrorMessage";
import AppFormField from "../../../components/forms/AppFormFeild";
import AppFormPhoneField from "../../../components/forms/AppFormPhoneFeild";
import AppFormRoleSelector from "../../../components/forms/AppFormRoleSelector";
import SubmitButton from "../../../components/forms/SubmitButton";
import { useTheme } from "../../../helper/themeProvider";
import { useUserStore } from "../../../store/useStore";
import Loader from "../../../components/Loader/Loader";
import * as ImagePicker from "expo-image-picker";
import AppFormImagePicker from "../../../components/forms/AppFormImagePicker";

const validationSchema = Yup.object({
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  phone_number: Yup.string().required().min(8).max(15).label("Phone"),
  profile_types: Yup.array().of(Yup.string().required()).min(1).label("Role"),
  image: Yup.string().required("Image is required"),
});

export default function AccountInfo() {
  const { user, loading, fetchUser, clearUserData } = useUserStore();
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
      return () => navigation.setOptions({ tabBarStyle: {} });
    }, [navigation])
  );

  useEffect(() => {
    fetchUser();
    return () => clearUserData();
  }, [fetchUser]);

  if (loading) {
    return <Loader isLoad={loading} />;
  }

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
            title="Account Info"
            titleStyle={[
              style.b18,
              { color: isDarkMode ? Colors.secondary : Colors.active },
            ]}
            centerTitle={true}
            elevation={0}
            leading={
              <TouchableOpacity onPress={() => router.back()}>
                <Icon
                  name="chevron-back"
                  color={isDarkMode ? Colors.secondary : Colors.active}
                  size={30}
                />
              </TouchableOpacity>
            }
          />
          <AppForm
            initialValues={{
              email: user.email,
              username: user.fullname,
              fullname: user.fullname,
              profile_picture: user.profile_picture,
              phone_number: `${user.country_code} ${user.phone_number}`,
              profile_types: user.profile_types,
            }}
            onSubmit={(values) => console.log(values)}
            validationSchema={validationSchema}
          >
            <AppErrorMessage error={""} visible={false} />
            <AppFormImagePicker name="image" />

            <AppFormField
              name={"fullname"}
              placeholder="USERNAME"
              style={style}
              parentStyles={{ marginTop: 20 }}
            />
            <AppFormField
              name={"username"}
              placeholder="FULL NAME"
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
            <AppFormRoleSelector name={"profile_types"} />
            <View style={{ marginTop: 50 }}>
              <SubmitButton title="SAVE" style={style} />
            </View>
          </AppForm>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
