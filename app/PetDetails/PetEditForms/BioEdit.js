import {
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import AppTitle from "../../components/AppTitle/AppTitle";
import AppForm from "../../components/forms/AppForm";
import * as Yup from "yup";
import AppFormField from "../../components/forms/AppFormFeild";
import SubmitButton from "../../components/forms/SubmitButton";
import AppErrorMessage from "../../components/forms/AppErrorMessage";
import { useTheme } from "../../helper/themeProvider";
import { router, useRouter } from "expo-router";
import AppFormDatePicker from "../../components/forms/AppFormDatePicker";
import AppFormRoleSelector from "../../components/forms/AppFormRoleSelector";
import AppFormPicker from "../../components/forms/AppFormPicker";
import femaleLight from "../../../assets/images/pets/femaleLight.png";
import maleLight from "../../../assets/images/pets/maleLight.png";

const validationSchema = Yup.object({
  pet_type: Yup.object().required().label("Pet Type"),
  pet_name: Yup.string().required().min(8).max(15).label("Pet Name"),
  pet_breed: Yup.object().required().label("Pet Breed"),
  pet_gender: Yup.string().required().label("Pet Gender"),
  birthdate: Yup.string().required().label("Pet Birthdate"),
});

export default function BioEdit() {
  const { isDarkMode } = useTheme();

  const handleSubmit = (values) => {
    router.push("/PetDetails/PetDetailPage");
  };

  const roles = {
    isOne: true,
    data: [
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
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppForm
              initialValues={{
                pet_name: "",
                pet_type: "",
                pet_breed: "",
                pet_gender: "",
                birthdate: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <AppTitle title={"PET DESCRIPTION"} style={style} />
              <AppErrorMessage error={""} visible={""} />
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

              <AppFormDatePicker
                name="birthdate"
                placeholder="SELECT BIRTHDATE"
              />
              <SubmitButton title="SAVE" style={style} />
            </AppForm>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
