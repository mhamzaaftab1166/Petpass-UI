import {
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import AutoUpdateFields from "../../components/forms/AutoUpdate";
import ResetBreedColorOnTypeChange from "../../components/forms/PetBreedTypeColorAutoUpdate";
import { useUserStore } from "../../store/useStore";
import { petActiveness, petNuetered } from "../../constants/pet";
import usePetSelections from "../../hooks/usePetSelections";
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
  pet_address: Yup.object()
    .required(
      "Pet address is required. Please add an address in the Address section before adding a pet."
    )
    .label("Pet Address"),
});
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

export default function AboutEdit() {
  const { user } = useUserStore();
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [petTypes, setPetTypes] = useState([]);
  const [petColors, setPetColors] = useState([]);
  const [petBreeds, setPetBreeds] = useState([]);
  const [petaddresses, setPetaddresses] = useState([]);
  const [selectedPetType, setSelectedPetType] = useState(null);
  const { pet } = useLocalSearchParams();

  const petData = pet ? JSON.parse(pet) : null;

  const { isDarkMode } = useTheme();

 const handleSubmit = async (values) => {
   setIsLoading(true);
   try {
     const image = values.pet_profile_picture;
     const isNetworkImage =
       typeof image === "string" && image.startsWith("http");
     const formData = new FormData();

     if (!isNetworkImage && image) {
       const imageUri = typeof image === "string" ? image : image.uri;
       if (imageUri) {
         const uriParts = imageUri.split(".");
         const fileType = uriParts[uriParts.length - 1];
         formData.append("pet_profile_picture", {
           uri: imageUri,
           name: `profile_picture.${fileType}`,
           type: `image/${fileType}`,
         });
       }
     } else {
       formData.append("pet_profile_picture", image);
     }

     formData.append("microchip_number", values.microchip_number || "");
     const dob = new Date(values.date_of_birth).toISOString().split("T")[0];
     formData.append("date_of_birth", dob);
     formData.append(
       "physically_active",
       values.physically_active?.value || ""
     );
     formData.append("gender", values.gender || "");
     formData.append("color", values.color?.value || "");
     formData.append("pet_breed", values.pet_breed?.value || "");
     formData.append("pet_name", values.pet_name || "");
     formData.append("pet_type", values.pet_type?.value || "");
     formData.append("nuetered", values.nuetered?.value || "");
     formData.append("height", values.height || "");
     formData.append("weight", values.weight || "");
     formData.append("description", petData?.description || "");
     formData.append("pet_address", values.pet_address?.value || "");
for (let [key, value] of formData.entries()) {
  console.log(key, value);
}
     const res = await petServices.updatePetAbout(formData, petData?.id);
     router.replace(`/PetDetails/PetDetailPage?id=${petData?.id}`);
   } catch (error) {
     console.error("An error occurred:", error);
     setErrorVisible(true);
     setError(error.message);
   } finally {
     setIsLoading(false);
   }
 };


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await petServices.getPetsTypes();
        const colors = await petServices.getPetsColor(
          selectedPetType || petData?.pet_type
        );
        const breeds = await petServices.getPetsBreeds(
          selectedPetType || petData?.pet_type
        );
        setPetBreeds(breeds?.pet_breeds);
        setPetTypes(data?.pet_types);
        setPetColors(colors?.pet_colors);
      } catch (error) {
        console.log(error, "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pet, selectedPetType]);

  useEffect(() => {
    const fetchPetAddresses = async () => {
      try {
        const addresses = await petServices.getPetsAddresses(user?.id);
        setPetaddresses(addresses?.data);
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchPetAddresses();
  }, []);

  const { petType, petBreed, petColor, petAddress, petNut, petActive } =
    usePetSelections({
      petData,
      petTypes,
      petBreeds,
      petColors,
      petaddresses,
      petNuetered,
      petActiveness,
    });

  if (!petTypes.length || !petBreeds.length || !petColors.length) {
    return <Loader isLoad={true} />;
  }

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
                pet_address: petAddress,
                weight: petData?.weight || "",
                height: petData?.height || "",
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <AppErrorMessage error={error} visible={errorVisible} />
              <ResetBreedColorOnTypeChange />
              <View style={{ marginTop: 20 }}>
                <AppFormImagePicker
                  name="pet_profile_picture"
                  pickerName={"Pet Profile Picture"}
                />
              </View>
              <AppFormPicker
                setState={(selected) => setSelectedPetType(selected.value)}
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
                items={petaddresses}
                name={"pet_address"}
                placeholder={"PET ADDRESS"}
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
