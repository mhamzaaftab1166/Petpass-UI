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
import { router, useLocalSearchParams, useRouter } from "expo-router";
import petServices from "../../services/petServices";
import Loader from "../../components/Loader/Loader";

const validationSchema = Yup.object({
  description: Yup.string().required().label("Description"),
});

export default function DescriptionEdit() {
  const { isDarkMode } = useTheme();
  const { pet } = useLocalSearchParams();
  const petData = pet ? JSON.parse(pet) : null;
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      await petServices.updatePetAbout(
        { ...petData, description: values?.description },
        petData?.id
      );
      setIsLoading(false);
      router.push(`/PetDetails/PetDetailPage?id=${petData?.id}`);
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppForm
              initialValues={{ description: petData?.description || "" }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <AppTitle title={"PET DESCRIPTION"} style={style} />
              <AppErrorMessage error={error} visible={errorVisible} />
              <AppFormField
                name={"description"}
                placeholder="DESCRIPTION"
                style={style}
                maxLength={500}
                multiline
                numberOfLines={3}
              />
              <SubmitButton title="SAVE" style={style} />
            </AppForm>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
