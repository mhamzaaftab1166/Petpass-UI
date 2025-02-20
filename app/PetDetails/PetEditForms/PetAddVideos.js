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
import AppFormImagePicker from "../../components/forms/AppFormGeneralImagesPicker";

const validationSchema = Yup.object({
  images: Yup.array().min(1, "Please select at least one Video.").max(15),
});

export default function PetAddVideos() {
  const { isDarkMode } = useTheme();

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
              initialValues={{ images: [] }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <View style={{ marginBottom: 30 }}>
                <AppTitle title={"PET GALLERY"} style={style} />
              </View>
              <AppErrorMessage error={""} visible={""} />
              <AppFormImagePicker name={"images"} mediaType={"video"} />
              <SubmitButton title="SAVE" style={style} />
            </AppForm>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
