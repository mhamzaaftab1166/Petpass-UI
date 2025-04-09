import {
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
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
import { useUserStore } from "../../../store/useStore";
import Loader from "../../../components/Loader/Loader";
import AppFormImagePicker from "../../../components/forms/AppFormImagePicker";
import userService from "../../../services/userService";
import * as FileSystem from "expo-file-system";
import AppText from "../../../components/AppText/AppText";
import {getFirstName} from "../../../utils/getFirstName"
import owner from "../../../../assets/images/authentication/d3.png";
import breeder from "../../../../assets/images/authentication/breeder.png";
import shop from "../../../../assets/images/authentication/d2.png";

const validationSchema = Yup.object({
  username: Yup.string().required().label("Username"),
  email: Yup.string().required().email().label("Email"),
  phone_number: Yup.string().required().min(8).max(15).label("Phone"),
  profile_types: Yup.array().of(Yup.string().required()).min(1).label("Role"),
  profile_picture: Yup.string(),
});

export default function AccountInfo() {
  const { user, loading, fetchUser, clearUserData } = useUserStore();
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetchUser();
    return () => clearUserData();
  }, [fetchUser]);

  if (loading) {
    return <Loader isLoad={loading} />;
  }

  const handleSubmit = async ({
    phone_number,
    profile_picture,
    profile_types,
    username,
  }) => {
    
    const phoneParts = phone_number.split(" ");
    const countryCode = phoneParts[0];
    const phoneNumber = phoneParts.slice(1).join("");
    const formData = new FormData();

    formData.append("userId", user.id);
    formData.append("phone_number", phoneNumber);
    formData.append("username", username);
    formData.append("country_code", countryCode);

    (Array.isArray(profile_types) ? profile_types : [profile_types]).forEach(
      (type, index) => formData.append(`profile_types[${index}]`, type)
    );

    if (profile_picture) {
      if (!profile_picture.startsWith("http")) {
        const fileType = profile_picture.split(".").pop();
        formData.append("profile_picture", {
          uri: profile_picture,
          name: `profile_picture.${fileType}`,
          type: `image/${fileType}`,
        });
      } else {
        formData.append("profile_picture", profile_picture);
      }
    }

    try {
      setIsLoading(true);
      const res = await userService.editProfile(formData);
      console.log(res, "res");
    } catch (error) {
      console.log(error, "error");
      setErrorVisible(true);
      setError(error.message);
    } finally {
      fetchUser();
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
            title="My Profile"
            titleStyle={[
              style.b18,
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
                  size={30}
                />
              </TouchableOpacity>
            }
          />

          <AppForm
            initialValues={{
              email: user?.email,
              username: user?.username,
              profile_picture: user?.profile_picture || "",
              phone_number: `${user?.country_code} ${user?.phone_number}`,
              profile_types: user?.profile_types,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppErrorMessage error={error} visible={errorVisible} />
            <AppFormImagePicker name="profile_picture" />

            <AppText
              style={{
                color: isDarkMode ? Colors.secondary : Colors.active,
                marginLeft: 5,
                fontSize: 30,
                marginTop: 30,
                textAlign: "center",
                fontFamily: "Avenir-Bold",
              }}
            >
              {`Hi, ${getFirstName(user?.username)}`}
            </AppText>

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
            <AppFormRoleSelector roles={roles} name={"profile_types"} />
            <View style={{ marginTop: 20 }}>
              <SubmitButton title="SAVE" style={style} />
            </View>
          </AppForm>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
