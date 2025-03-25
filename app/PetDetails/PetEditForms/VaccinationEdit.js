import {
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import AppTitle from "../../components/AppTitle/AppTitle";
import Icon from "react-native-vector-icons/Ionicons";
import AppForm from "../../components/forms/AppForm";
import * as Yup from "yup";
import AppFormDatePicker from "../../components/forms/AppFormDatePicker";
import SubmitButton from "../../components/forms/SubmitButton";
import AppErrorMessage from "../../components/forms/AppErrorMessage";
import { useTheme } from "../../helper/themeProvider";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import {
  formatVaccinationPayload,
  formatUpdateVaccinationPayload,
} from "../../utils/generalUtils";
import Checkbox from "expo-checkbox";
import Loader from "../../components/Loader/Loader";
import petServices from "../../services/petServices";
import { AppBar } from "@react-native-material/core";

const today = new Date();
today.setHours(0, 0, 0, 0);

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1); // Tomorrow's date

const validationSchema = Yup.object({
  NobivacKC_Vaccinated_Date: Yup.date()
    .transform((value, originalValue) =>
      originalValue ? new Date(originalValue) : null
    )
    .max(tomorrow, "Nobivac KC Vaccinated Date must be today or tomorrow")
    .label("Nobivac KC Vaccinated Date"),

  NobivacKC_Vaccination_Date: Yup.date()
    .transform((value, originalValue) =>
      originalValue ? new Date(originalValue) : null
    )
    .min(today, "Nobivac KC Vaccination Date must be today or later")
    .required("Nobivac KC Vaccination Date is required")
    .label("Nobivac KC Vaccination Date"),

  DHPPiL_Vaccinated_Date: Yup.date()
    .transform((value, originalValue) =>
      originalValue ? new Date(originalValue) : null
    )
    .max(tomorrow, "DHPPiL Vaccinated Date must be today or tomorrow")
    .label("DHPPiL Vaccinated Date"),

  DHPPiL_Vaccination_Date: Yup.date()
    .transform((value, originalValue) =>
      originalValue ? new Date(originalValue) : null
    )
    .min(today, "DHPPiL Vaccination Date must be today or later")
    .required("DHPPiL Vaccination Date is required")
    .label("DHPPiL Vaccination Date"),

  Rabies_Vaccinated_Date: Yup.date()
    .transform((value, originalValue) =>
      originalValue ? new Date(originalValue) : null
    )
    .max(tomorrow, "Rabies Vaccinated Date must be today or tomorrow")
    .label("Rabies Vaccinated Date"),

  Rabies_Vaccination_Date: Yup.date()
    .transform((value, originalValue) =>
      originalValue ? new Date(originalValue) : null
    )
    .min(today, "Rabies Vaccination Date must be today or later")
    .required("Rabies Vaccination Date is required")
    .label("Rabies Vaccination Date"),
});


// const today = new Date();
// today.setHours(0, 0, 0, 0);

// const validationSchema = Yup.object({
//   NobivacKC_Vaccinated_Date: Yup.date()
//     .transform((value, originalValue) =>
//       originalValue ? new Date(originalValue) : null
//     )
//     .max(today, "Nobivac KC Vaccinated Date must be today or earlier")
//     .label("Nobivac KC Vaccinated Date"),

//   NobivacKC_Vaccination_Date: Yup.date()
//     .transform((value, originalValue) =>
//       originalValue ? new Date(originalValue) : null
//     )
//     .min(today, "Nobivac KC Vaccination Date must be today or later")
//     .required("Nobivac KC Vaccination Date is required")
//     .label("Nobivac KC Vaccination Date"),

//   DHPPiL_Vaccinated_Date: Yup.date()
//     .transform((value, originalValue) =>
//       originalValue ? new Date(originalValue) : null
//     )
//     .max(today, "DHPPiL Vaccinated Date must be today or earlier")
//     .label("DHPPiL Vaccinated Date"),

//   DHPPiL_Vaccination_Date: Yup.date()
//     .transform((value, originalValue) =>
//       originalValue ? new Date(originalValue) : null
//     )
//     .min(today, "DHPPiL Vaccination Date must be today or later")
//     .required("DHPPiL Vaccination Date is required")
//     .label("DHPPiL Vaccination Date"),

//   Rabies_Vaccinated_Date: Yup.date()
//     .transform((value, originalValue) =>
//       originalValue ? new Date(originalValue) : null
//     )
//     .max(today, "Rabies Vaccinated Date must be today or earlier")
//     .label("Rabies Vaccinated Date"),

//   Rabies_Vaccination_Date: Yup.date()
//     .transform((value, originalValue) =>
//       originalValue ? new Date(originalValue) : null
//     )
//     .min(today, "Rabies Vaccination Date must be today or later")
//     .required("Rabies Vaccination Date is required")
//     .label("Rabies Vaccination Date"),
// });


export default function VaccinationEdit() {
  const { isDarkMode } = useTheme();
  const { pet } = useLocalSearchParams();
  const petData = pet ? JSON.parse(pet) : null;
  const [isNobivacVaccinated, setIsNobivacVaccinated] = useState(false);
  const [isDHPPiLVaccinated, setIsDHPPiLVaccinated] = useState(false);
  const [isRabiesVaccinated, setIsRabiesVaccinated] = useState(false);
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (values) => {
    const payload = formatVaccinationPayload(petData?.id, values);
    try {
      setIsLoading(true);
      const res = await (petData?.vaccinations?.length > 0
        ? petServices.updateVaccinations(
            formatUpdateVaccinationPayload(
              petData?.vaccinations[0]?.pet_vaccination_id,
              values,
              petData?.vaccinations
            )
          )
        : petServices.addVaccinations(payload));
      setIsLoading(false);
      router.replace(`/PetDetails/PetDetailPage?id=${petData?.id}`);
    } catch (error) {
      setErrorVisible(true);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
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
        <Loader isLoad={isLoading} />
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          <AppBar
            color={isDarkMode ? Colors.active : Colors.secondary}
            title={`Add Pet Vaccination`}
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
                NobivacKC_Vaccinated_Date:
                  petData?.vaccinations?.[0]?.vaccinated_date &&
                  petData.vaccinations[0].vaccinated_date !== "0000-00-00"
                    ? new Date(petData.vaccinations[0].vaccinated_date)
                    : "",

                NobivacKC_Vaccination_Date:
                  petData?.vaccinations?.[0]?.vaccination_next_date &&
                  petData.vaccinations[0].vaccination_next_date !== "0000-00-00"
                    ? new Date(petData.vaccinations[0].vaccination_next_date)
                    : "",

                DHPPiL_Vaccinated_Date:
                  petData?.vaccinations?.[1]?.vaccinated_date &&
                  petData.vaccinations[1].vaccinated_date !== "0000-00-00"
                    ? new Date(petData.vaccinations[1].vaccinated_date)
                    : "",

                DHPPiL_Vaccination_Date:
                  petData?.vaccinations?.[1]?.vaccination_next_date &&
                  petData.vaccinations[1].vaccination_next_date !== "0000-00-00"
                    ? new Date(petData.vaccinations[1].vaccination_next_date)
                    : "",

                Rabies_Vaccinated_Date:
                  petData?.vaccinations?.[2]?.vaccinated_date &&
                  petData.vaccinations[2].vaccinated_date !== "0000-00-00"
                    ? new Date(petData.vaccinations[2].vaccinated_date)
                    : "",

                Rabies_Vaccination_Date:
                  petData?.vaccinations?.[2]?.vaccination_next_date &&
                  petData.vaccinations[2].vaccination_next_date !== "0000-00-00"
                    ? new Date(petData.vaccinations[2].vaccination_next_date)
                    : "",
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {/* <AppTitle title={"PET VACCINATIONS"} style={style} /> */}
              <AppErrorMessage error={error} visible={errorVisible} />

              <Text
                style={{
                  color: isDarkMode ? Colors.secondary : Colors.lable,
                  fontFamily: "Avenir-Bold",
                  fontSize: 18,
                  marginTop: 20,
                }}
              >
                Nobivac KC
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={
                    isNobivacVaccinated ||
                    (petData?.vaccinations[0]?.vaccinated_date &&
                      petData?.vaccinations[0]?.vaccinated_date !==
                        "0000-00-00")
                  }
                  onValueChange={setIsNobivacVaccinated}
                  color={
                    isNobivacVaccinated ||
                    (petData?.vaccinations[0]?.vaccinated_date &&
                      petData?.vaccinations[0]?.vaccinated_date !==
                        "0000-00-00")
                      ? Colors.primary
                      : Colors.border
                  }
                />
                <Text
                  style={[
                    style.r14,
                    {
                      color: isDarkMode ? Colors.secondary : Colors.lable,
                      marginLeft: 6,
                    },
                  ]}
                >
                  Is Vaccinated
                </Text>
              </View>
              {(isNobivacVaccinated ||
                (petData?.vaccinations[0]?.vaccinated_date &&
                  petData?.vaccinations[0]?.vaccinated_date !==
                    "0000-00-00")) && (
                <AppFormDatePicker
                  name="NobivacKC_Vaccinated_Date"
                  placeholder="Nobivac KC VACCINATED DATE"
                />
              )}
              <AppFormDatePicker
                name="NobivacKC_Vaccination_Date"
                placeholder="Nobivac KC NEXT DUE ON"
              />

              <Text
                style={{
                  color: isDarkMode ? Colors.secondary : Colors.lable,
                  fontFamily: "Avenir-Bold",
                  fontSize: 18,
                  marginTop: 20,
                }}
              >
                DHPPiL
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={
                    isDHPPiLVaccinated ||
                    (petData?.vaccinations[1]?.vaccinated_date &&
                      petData?.vaccinations[1]?.vaccinated_date !==
                        "0000-00-00")
                  }
                  onValueChange={setIsDHPPiLVaccinated}
                  color={
                    isDHPPiLVaccinated ||
                    (petData?.vaccinations[1]?.vaccinated_date &&
                      petData?.vaccinations[1]?.vaccinated_date !==
                        "0000-00-00")
                      ? Colors.primary
                      : Colors.border
                  }
                />
                <Text
                  style={[
                    style.r14,
                    {
                      color: isDarkMode ? Colors.secondary : Colors.lable,
                      marginLeft: 6,
                    },
                  ]}
                >
                  Is Vaccinated
                </Text>
              </View>
              {(isDHPPiLVaccinated ||
                (petData?.vaccinations[1]?.vaccinated_date &&
                  petData?.vaccinations[1]?.vaccinated_date !==
                    "0000-00-00")) && (
                <AppFormDatePicker
                  name="DHPPiL_Vaccinated_Date"
                  placeholder="DHPPiL VACCINATED DATE"
                />
              )}
              <AppFormDatePicker
                name="DHPPiL_Vaccination_Date"
                placeholder="DHPPiL NEXT DUE ON"
              />

              <Text
                style={{
                  color: isDarkMode ? Colors.secondary : Colors.lable,
                  fontFamily: "Avenir-Bold",
                  fontSize: 18,
                  marginTop: 20,
                }}
              >
                Rabies
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Checkbox
                  style={styles.checkbox}
                  value={
                    isRabiesVaccinated ||
                    (petData?.vaccinations[2]?.vaccinated_date &&
                      petData?.vaccinations[2]?.vaccinated_date !==
                        "0000-00-00")
                  }
                  onValueChange={setIsRabiesVaccinated}
                  color={
                    isRabiesVaccinated ||
                    (petData?.vaccinations[2]?.vaccinated_date &&
                      petData?.vaccinations[2]?.vaccinated_date !==
                        "0000-00-00")
                      ? Colors.primary
                      : Colors.border
                  }
                />
                <Text
                  style={[
                    style.r14,
                    {
                      color: isDarkMode ? Colors.secondary : Colors.lable,
                      marginLeft: 6,
                    },
                  ]}
                >
                  Is Vaccinated
                </Text>
              </View>
              {(isRabiesVaccinated ||
                (petData?.vaccinations[2]?.vaccinated_date &&
                  petData?.vaccinations[2]?.vaccinated_date !==
                    "0000-00-00")) && (
                <AppFormDatePicker
                  name="Rabies_Vaccinated_Date"
                  placeholder="Rabies VACCINATED DATE"
                />
              )}
              <AppFormDatePicker
                name="Rabies_Vaccination_Date"
                placeholder="Rabies NEXT DUE ON"
              />

              <SubmitButton title="SAVE" style={style} />
            </AppForm>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    marginTop: 6,
    borderRadius: 10,
    fontFamily: "Avenir-bold",
  },
});
