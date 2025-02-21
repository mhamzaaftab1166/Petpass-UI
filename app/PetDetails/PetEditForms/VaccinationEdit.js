import {
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import AppTitle from "../../components/AppTitle/AppTitle";
import AppForm from "../../components/forms/AppForm";
import * as Yup from "yup";
import AppFormDatePicker from "../../components/forms/AppFormDatePicker";
import SubmitButton from "../../components/forms/SubmitButton";
import AppErrorMessage from "../../components/forms/AppErrorMessage";
import { useTheme } from "../../helper/themeProvider";
import { router, useRouter } from "expo-router";
import Checkbox from "expo-checkbox";

const validationSchema = Yup.object({
  NobivacKC_Vaccinated_Date: Yup.string().label("Nobivac KC Vaccinated Date"),
  NobivacKC_Vaccination_Date: Yup.string()
    .required()
    .label("Nobivac KC Vaccination Date"),
  DHPPiL_Vaccinated_Date: Yup.string().label("DHPPiL Vaccinated Date"),
  DHPPiL_Vaccination_Date: Yup.string()
    .required()
    .label("DHPPiL Vaccination Date"),
  Rabies_Vaccinated_Date: Yup.string().label("Rabies Vaccinated Date"),
  Rabies_Vaccination_Date: Yup.string()
    .required()
    .label("Rabies Vaccination Date"),
});

export default function VaccinationEdit() {
  const { isDarkMode } = useTheme();
  const [isNobivacVaccinated, setIsNobivacVaccinated] = useState(false);
  const [isDHPPiLVaccinated, setIsDHPPiLVaccinated] = useState(false);
  const [isRabiesVaccinated, setIsRabiesVaccinated] = useState(false);

  const handleSubmit = (values) => {
    console.log(values);
    router.push("/PetDetails/PetDetailPage");
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
                NobivacKC_Vaccinated_Date: "",
                NobivacKC_Vaccination_Date: "",
                DHPPiL_Vaccinated_Date: "",
                DHPPiL_Vaccination_Date: "",
                Rabies_Vaccinated_Date: "",
                Rabies_Vaccination_Date: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <AppTitle title={"PET VACCINATIONS"} style={style} />
              <AppErrorMessage error={""} visible={""} />

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
                  value={isNobivacVaccinated}
                  onValueChange={setIsNobivacVaccinated}
                  color={isNobivacVaccinated ? Colors.primary : Colors.border}
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
              {isNobivacVaccinated && (
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
                  value={isDHPPiLVaccinated}
                  onValueChange={setIsDHPPiLVaccinated}
                  color={isDHPPiLVaccinated ? Colors.primary : Colors.border}
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
              {isDHPPiLVaccinated && (
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
                  value={isRabiesVaccinated}
                  onValueChange={setIsRabiesVaccinated}
                  color={isRabiesVaccinated ? Colors.primary : Colors.border}
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
              {isRabiesVaccinated && (
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
