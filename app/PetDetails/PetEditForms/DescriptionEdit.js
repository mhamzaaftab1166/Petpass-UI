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
import AppForm from "../../components/forms/AppForm";
import Icon from "react-native-vector-icons/Ionicons";
import * as Yup from "yup";
import AppFormField from "../../components/forms/AppFormFeild";
import SubmitButton from "../../components/forms/SubmitButton";
import AppErrorMessage from "../../components/forms/AppErrorMessage";
import { useTheme } from "../../helper/themeProvider";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import petServices from "../../services/petServices";
import Loader from "../../components/Loader/Loader";
import { AppBar } from "@react-native-material/core";

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
            title={`Edit Description`}
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
              initialValues={{ description: petData?.description || "" }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
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
