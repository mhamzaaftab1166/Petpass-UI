import {
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Text,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../theme/color";
import style from "../theme/style";
import { useRouter } from "expo-router";
import * as Yup from "yup";
import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import AppFormField from "../components/forms/AppFormFeild";
import AppFormRoleSelector from "../components/forms/AppFormRoleSelector";
import SubmitButton from "../components/forms/SubmitButton";
import { useTheme } from "../helper/themeProvider";
import Loader from "../components/Loader/Loader";
import AppFormImagePicker from "../components/forms/AppFormImagePicker";
import AppFormPicker from "../components/forms/AppFormPicker";
import femaleLight from "../../assets/images/pets/femaleLight.png";
import maleLight from "../../assets/images/pets/maleLight.png";

const validationSchema = Yup.object({
  pet_profile_picture: Yup.string().required().label("Pet Profile Image"),
  pet_type: Yup.object().required().label("Pet Type"),
  pet_name: Yup.string().required().min(8).max(15).label("Pet Name"),
  pet_breed: Yup.object().required().label("Pet Breed"),
  pet_gender: Yup.object().required().label("Pet Gender"),
  micro_chip: Yup.string().required().min(4).max(30).label("Micro Chip Number"),
  color: Yup.string().required().label("Pet Color"),
});

export default function AccountInfo() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
        {
          title: "Male",
          role: "male",
          imageSrc: maleLight,
        },
        {
          title: "Female",
          role: "female",
          imageSrc: femaleLight,
        },
      ];

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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, marginHorizontal: 20 }}
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
                pet_profile_picture: "",
                pet_name: "",
                pet_type: "",
                pet_breed: "",
                pet_gender: "",
                micro_chip: "",
                color: "",
              }}
              onSubmit={""}
              validationSchema={validationSchema}
            >
              <AppErrorMessage error={error} visible={errorVisible} />
              <AppFormImagePicker name="pet_profile_picture" />
              <Text
                style={[
                  style.subtitle,
                  {
                    textAlign: "center",
                    color: Colors.primary,
                    paddingTop: 15,
                    fontFamily: "Avenir-Bold",
                  },
                ]}
              >
                Add your pets here
              </Text>
              <Text
                style={[
                  style.r16,
                  {
                    color: Colors.active,
                    textAlign: "center",
                    fontFamily: "Avenir-Regular",
                    padding: "20px",
                    paddingTop: 15,
                  },
                ]}
              >
                You can have unlimited pets for free
              </Text>
              <Text
                style={[
                  style.r16,
                  {
                    color: Colors.active,
                    textAlign: "center",
                    fontFamily: "Avenir-Regular",
                    paddingTop: 5,
                  },
                ]}
              >
                give the detail of your pets
              </Text>

              <AppFormPicker
                items={[{ label: "Dog", value: "dog" }]}
                name={"pet_type"}
                placeholder={"PET TYPE"}
              />

              <AppFormField
                name={"pet_name"}
                placeholder="PET NAME"
                style={style}
                parentStyles={{ marginTop: 20 }}
              />

              <AppFormPicker
                items={[{ label: "Dog", value: "dog" }]}
                name={"pet_breed"}
                placeholder={"PET BREED"}
              />

              <AppFormRoleSelector roles={roles} name={"pet_gender"} />

              <AppFormField
                name={"micro_chip"}
                placeholder="MICRO CHIP NUMBER"
                style={style}
                parentStyles={{ marginTop: 20 }}
              />

              <AppFormPicker
                items={[{ label: "Brown", value: "brown" }]}
                name={"color"}
                placeholder={"COLOUR"}
              />

              <View style={{ marginTop: 20 }}>
                <SubmitButton title="SAVE" style={style} />
              </View>
            </AppForm>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
