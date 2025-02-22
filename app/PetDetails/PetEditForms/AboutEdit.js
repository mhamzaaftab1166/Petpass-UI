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
import AppFormRangeField from "../../components/forms/AppFormRangeFeild";
import AppFormImagePicker from "../../components/forms/AppFormImagePicker";

const validationSchema = Yup.object({
  pet_type: Yup.object().required().label("Pet Type"),
  pet_name: Yup.string().required().min(8).max(15).label("Pet Name"),
  pet_breed: Yup.object().required().label("Pet Breed"),
  pet_gender: Yup.string().required().label("Pet Gender"),
  birthdate: Yup.string().required().label("Pet Birthdate"),
  nuetered: Yup.object().required().label("Pet Nuetered"),
  active: Yup.object().required().label("Phycically Active"),
  micro_chip: Yup.string().required().min(4).max(30).label("Micro Chip Number"),
  color: Yup.object().required().label("Pet Color"),
  weightRange: Yup.object().required().label("Pet Weight"),
  heightRange: Yup.object().required().label("Pet Height"),
  profile_picture: Yup.string().label("Pet Profile Image"),
});

export default function AboutEdit() {
  const { isDarkMode } = useTheme();

  const handleSubmit = (values) => {
    console.log(values);

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
                profile_picture: null,
                pet_name: "",
                pet_type: "",
                pet_breed: "",
                pet_gender: "",
                birthdate: "",
                nuetered: "",
                active: "",
                micro_chip: "",
                color: "",
                weightRange: "",
                heightRange: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <AppTitle title={"PET ABOUT"} style={style} />
              <AppErrorMessage error={""} visible={""} />
              <AppFormImagePicker name="profile_picture" />
              <AppFormPicker
                items={[{ label: "Dog", value: "dog" }]}
                name={"pet_type"}
                placeholder={"PET TYPE"}
              />

              <AppFormField
                name={"pet_name"}
                placeholder="PET NAME"
                style={style}
                parentStyles={{ marginTop: 30 }}
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
              <AppFormPicker
                items={[{ label: "Brown", value: "brown" }]}
                name={"color"}
                placeholder={"COLOUR"}
              />
              <AppFormPicker
                items={[{ label: "Yes", value: "yes" }]}
                name={"nuetered"}
                placeholder={"NUETERED"}
              />
              <AppFormPicker
                items={[{ label: "Very Active", value: "very active" }]}
                name={"active"}
                placeholder={"PHYSICALLY ACTIVE"}
              />
              <View>
                <AppFormField
                  name={"micro_chip"}
                  placeholder="MICRO CHIP NUMBER"
                  style={style}
                  parentStyles={{ marginTop: 30 }}
                />
              </View>
              <AppFormRangeField
                name="weightRange"
                minValue={50}
                maxValue={200}
                label="Weight Range (kg)"
                style={style}
              />

              <AppFormRangeField
                name="heightRange"
                minValue={50}
                maxValue={200}
                label="Height Range (cm)"
                style={style}
              />

              <SubmitButton title="SAVE" style={style} />
            </AppForm>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
