import {
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import AppTitle from "../../components/AppTitle/AppTitle";
import Icon from "react-native-vector-icons/Ionicons";
import AppForm from "../../components/forms/AppForm";
import * as Yup from "yup";
import AppFormField from "../../components/forms/AppFormFeild";
import SubmitButton from "../../components/forms/SubmitButton";
import AppErrorMessage from "../../components/forms/AppErrorMessage";
import { useTheme } from "../../helper/themeProvider";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import AppFormDatePicker from "../../components/forms/AppFormDatePicker";
import AppFormRoleSelector from "../../components/forms/AppFormRoleSelector";
import AppFormPicker from "../../components/forms/AppFormPicker";
import femaleLight from "../../../assets/images/pets/femaleLight.png";
import maleLight from "../../../assets/images/pets/maleLight.png";
import AppFormRangeField from "../../components/forms/AppFormRangeFeild";
import AppFormImagePicker from "../../components/forms/AppFormImagePicker";
import Loader from "../../components/Loader/Loader";
import { convertImageToBase64 } from "../../utils/generalUtils";
import petServices from "../../services/petServices";
import { AppBar } from "@react-native-material/core";

const validationSchema = Yup.object({
  pet_type: Yup.object().required().label("Pet Type"),
  pet_name: Yup.string().required().min(3).max(15).label("Pet Name"),
  pet_breed: Yup.object().required().label("Pet Breed"),
  gender: Yup.string().required().label("Pet Gender"),
  date_of_birth: Yup.string().required().label("Pet Birthdate"),
  nuetered: Yup.object().label("Pet Nuetered"),
  physically_active: Yup.object().label("Phycically Active"),
  microchip_number: Yup.string()
    .required()
    .min(4)
    .max(30)
    .label("Micro Chip Number"),
  color: Yup.object().required().label("Pet Color"),
  weight: Yup.object().label("Pet Weight"),
  height: Yup.object().label("Pet Height"),
  pet_profile_picture: Yup.string().label("Pet Profile Image"),
});

export default function AboutEdit() {
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { pet } = useLocalSearchParams();
  const petData = pet ? JSON.parse(pet) : null;

  const { isDarkMode } = useTheme();

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const pet_profile_picture = await convertImageToBase64(
        values.pet_profile_picture
      );
      const payload = {
        pet_profile_picture,
        microchip_number: values.microchip_number,
        date_of_birth: values,
        date_of_birth: new Date(values.date_of_birth)
          .toISOString()
          .split("T")[0],

        physically_active: values.physically_active?.value || "",
        gender: values?.gender,
        color: values?.color.value,
        pet_breed: values?.pet_breed.value || "",
        pet_name: values?.pet_name,
        pet_type: values?.pet_type.value || "",
        nuetered: values?.nuetered.value || "",
        height: values?.height,
        weight: values?.weight,
        description: petData?.description,
      };

      const res = await petServices.updatePetAbout(payload, petData?.id);
      setIsLoading(false);
      router.replace(`/PetDetails/PetDetailPage?id=${petData?.id}`);
    } catch (error) {
      setErrorVisible(true);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
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

  const petTypes = [
    { label: "Dog", value: "dog" },
    { label: "Cat", value: "cat" },
  ];
  const petType =
    petTypes.find((type) => type.value === petData?.pet_type) || null;
  const petBreeds = [
    { label: "Dog", value: "dog" },
    { label: "Cat", value: "cat" },
  ];
  const petBreed =
    petBreeds.find((breed) => breed.value === petData?.pet_breed) || null;
  const petColors = [
    { label: "Brown", value: "brown" },
    { label: "White", value: "white" },
  ];
  const petColor =
    petColors.find((color) => color.value === petData?.color) || null;

  const petNuetered = [{ label: "Yes", value: "yes" }];
  const petNut =
    petNuetered.find((nut) => nut.value === petData?.nuetered) || "";

  const petActiveness = [{ label: "Very Active", value: "very active" }];
  const petActive =
    petActiveness.find(
      (active) => active.value === petData?.physically_active
    ) || "";
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
        <Loader isLoad={isLoading} />
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          <AppBar
            color={isDarkMode ? Colors.active : Colors.secondary}
            title={`Edit Your Pet Profile`}
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
              <TouchableOpacity
                onPress={() =>
                  router.replace(`/PetDetails/PetDetailPage?id=${petData?.id})`)
                }
              >
                <Icon
                  name="chevron-back"
                  color={isDarkMode ? Colors.secondary : Colors.active}
                  size={30}
                />
              </TouchableOpacity>
            }
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppForm
              initialValues={{
                pet_profile_picture: petData?.pet_profile_picture || null,
                pet_name: petData?.pet_name || "",
                pet_type: petType || "",
                pet_breed: petBreed || "",
                gender: petData?.gender || "",
                date_of_birth: new Date(petData?.date_of_birth || ""),
                nuetered: petNut || "",
                physically_active: petActive || "",
                microchip_number: petData?.microchip_number.toString() || "",
                color: petColor || "",
                weight: petData?.weight || "",
                height: petData?.height || "",
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {/* <AppTitle title={"PET ABOUT"} style={style} /> */}
              <AppErrorMessage error={error} visible={errorVisible} />
              <View style={{ marginTop: 20 }}>
                <AppFormImagePicker
                  name="pet_profile_picture"
                  pickerName={"Pet Profile Picture"}
                />
              </View>
              <AppFormPicker
                items={petTypes}
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
                items={petBreeds}
                name={"pet_breed"}
                placeholder={"PET BREED"}
              />

              <AppFormRoleSelector roles={roles} name={"gender"} />

              <AppFormDatePicker
                name="date_of_birth"
                placeholder="SELECT BIRTHDATE"
              />
              <AppFormPicker
                items={petColors}
                name={"color"}
                placeholder={"COLOUR"}
              />
              <AppFormPicker
                items={petNuetered}
                name={"nuetered"}
                placeholder={"NUETERED"}
              />
              <AppFormPicker
                items={petActiveness}
                name={"physically_active"}
                placeholder={"PHYSICALLY ACTIVE"}
              />
              <View>
                <AppFormField
                  name={"microchip_number"}
                  placeholder="MICRO CHIP NUMBER"
                  style={style}
                  parentStyles={{ marginTop: 30 }}
                />
              </View>
              <AppFormRangeField
                name="weight"
                minValue={0}
                maxValue={200}
                label="Weight Range (kg)"
                style={style}
              />

              <AppFormRangeField
                name="height"
                minValue={0}
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
