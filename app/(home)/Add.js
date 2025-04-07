import {
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Text,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../theme/color";
import style from "../theme/style";
import { useFocusEffect, useRouter } from "expo-router";
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
import AppFormDatePicker from "../components/forms/AppFormDatePicker";
import OnSuccess from "../components/OnSuccess/OnSuccess";
import petServices from "../services/petServices";
import { convertImageToBase64 } from "../utils/generalUtils";
import AutoUpdateFields from "../components/forms/AutoUpdate";
import { useUserStore } from "../store/useStore";

const validationSchema = Yup.object({
  pet_profile_picture: Yup.string().required().label("Pet Profile Image"),
  pet_type: Yup.object().required().label("Pet Type"),
  pet_name: Yup.string().required().min(3).max(15).label("Pet Name"),
  pet_breed: Yup.object().required().label("Pet Breed"),
  gender: Yup.string().required().label("Pet Gender"),
  date_of_birth: Yup.string().required().label("Pet Birthdate"),
  microchip_number: Yup.string()
    .required()
    .min(4)
    .max(30)
    .label("Micro Chip Number"),
  pet_address: Yup.object()
    .required(
      "Pet address is required. Please add an address in the Address section before adding a pet."
    )
    .label("Pet Address"),
  color: Yup.object().required().label("Pet Color"),
});

export default function Add() {
  const { user } = useUserStore();
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [petTypes, setPetTypes] = useState([]);
  const [selectedPetType, setSelectedPetType] = useState("");
  const [selectedPetBreedType, setSelectedPetBreedType] = useState("");
  const [petAddresses, setPetAddresses] = useState([]);
  const [petColor, setPetColor] = useState("");
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

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const pet_profile_picture = await convertImageToBase64(
        values.pet_profile_picture
      );
      const payload = {
        pet_type: values.pet_type?.value || "",
        pet_name: values.pet_name || "",
        pet_breed: values.pet_breed?.value || "",
        color: values.color?.value || "",
        gender: values.gender || "",
        date_of_birth: values.date_of_birth
          ? new Date(values.date_of_birth).toISOString().split("T")[0]
          : "",
        microchip_number: values.microchip_number || "",
        pet_profile_picture: pet_profile_picture,
        pet_address: values.pet_address?.value || "",
      };
      
      const res = await petServices.createUserPet(payload);
      setIsLoading(false);
      setSubmitted(true);
    } catch (error) {
      setErrorVisible(true);
      setError(error.message);
      setSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  };

 useFocusEffect(
   useCallback(() => {
     setSubmitted(false);

     const fetchAll = async () => {
       try {
         const [addressesRes, typesRes] = await Promise.all([
           petServices.getPetsAddresses(user?.id),
           petServices.getPetsTypes(),
         ]);

         setPetAddresses(addressesRes?.data);
         setPetTypes(typesRes?.pet_types);
       } catch (err) {
         console.log(err);
       }
     };

     fetchAll();
   }, [user?.id])
 );

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        if (selectedPetType) {
          
          const breedData = await petServices.getPetsBreeds(selectedPetType);
          setSelectedPetBreedType(breedData?.pet_breeds);
          const colorData = await petServices.getPetsColor(selectedPetType);
          setPetColor(colorData?.pet_colors);
        }
      } catch (err) {
        console.log(err);
      } finally {
      }
    };
    fetchPetData();
  }, [selectedPetType]);

  return (
    <SafeAreaView
      style={[
        style.area,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <Loader isLoad={isLoading} />
      {!submitted ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, marginHorizontal: 0 }}
          >
            <View
              style={[
                style.main,
                {
                  backgroundColor: isDarkMode
                    ? Colors.active
                    : Colors.secondary,
                  marginTop: 10,
                },
              ]}
            >
              <AppBar
                color={isDarkMode ? Colors.active : Colors.secondary}
                title="Add Your Pets Here"
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
                  pet_profile_picture: "",
                  pet_type: null,
                  pet_name: "",
                  pet_breed: null,
                  gender: "",
                  date_of_birth: "",
                  microchip_number: "",
                  color: null,
                  pet_address: null,
                }}
                onSubmit={(values) => handleSubmit(values)}
                validationSchema={validationSchema}
              >
                <AppErrorMessage error={error} visible={errorVisible} />
                <AutoUpdateFields selectedPetType={selectedPetType} />
                <AppFormImagePicker
                  name="pet_profile_picture"
                  pickerName="Pet Profile Picture"
                />
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

                <AppFormField
                  name={"pet_name"}
                  placeholder="PET NAME"
                  style={style}
                  parentStyles={{ marginTop: 20 }}
                />

                <AppFormPicker
                  items={petTypes}
                  name={"pet_type"}
                  placeholder={"PET TYPE"}
                  setState={(selected) => setSelectedPetType(selected.value)}
                />

                <AppFormPicker
                  items={selectedPetBreedType}
                  name={"pet_breed"}
                  placeholder={"PET BREED"}
                />

                <AppFormPicker
                  items={petColor}
                  name={"color"}
                  placeholder={"COLOUR"}
                />

                <AppFormPicker
                  items={petAddresses}
                  name={"pet_address"}
                  placeholder={"PET ADDRESS"}
                />
                <AppFormRoleSelector roles={roles} name={"gender"} />

                <AppFormDatePicker
                  name="date_of_birth"
                  placeholder="SELECT BIRTHDATE"
                />

                <AppFormField
                  name={"microchip_number"}
                  placeholder="MICRO CHIP NUMBER"
                  style={style}
                  parentStyles={{ marginTop: 20 }}
                />

                <View style={{ marginBottom: 80 }}>
                  <SubmitButton title="SAVE" style={style} />
                </View>
              </AppForm>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        <OnSuccess route={"/MyAccount/screens/MyPets"} />
      )}
    </SafeAreaView>
  );
}
