import {
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import { useLocalSearchParams, useRouter } from "expo-router";
import AppTitle from "../../components/AppTitle/AppTitle";
import AppForm from "../../components/forms/AppForm";
import * as Yup from "yup";
import SubmitButton from "../../components/forms/SubmitButton";
import AppErrorMessage from "../../components/forms/AppErrorMessage";
import AppFormPassportPicker from "../../components/forms/AppFormPassportPicker";
import { useTheme } from "../../helper/themeProvider";
import petServices from "../../services/petServices";
import * as FileSystem from "expo-file-system";
import Loader from "../../components/Loader/Loader";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const validationSchema = Yup.object({
  passport: Yup.string().required(),
});

export default function Login() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { pet } = useLocalSearchParams();
  const petData = pet ? JSON.parse(pet) : null;
  

  const handleSubmit = async (info) => {
    const { passport } = info;
    console.log(passport, 'pass');
    let fileUri = passport

    if (!fileUri) {
      console.error("No file URI found");
      return;
    }
  
    if (fileUri.startsWith("content://")) {
      const fileName = `passport_${Date.now()}.jpg`;
      const newPath = `${FileSystem.cacheDirectory}${fileName}`;
      try {
        await FileSystem.copyAsync({
          from: fileUri,
          to: newPath,
        });
        fileUri = newPath;
      } catch (error) {
        console.error("Failed to copy file from content URI:", error);
        return;
      }
    }

    try {
      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      const payload = {
        pet_id: petData?.id,
        pet_passport_id : petData?.pet_passport?.id || null,
        passport: `data:image/jpeg;base64,${base64}`,
      };
        setIsLoading(true);
        const res = await petServices.addPassport(payload)
        if(res.message === "Pet Passport saved successfully."){
          setIsLoading(false);
          router.replace(`/PetDetails/PetDetailPage?id=${petData?.id}`);
        }
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
            <AppBar
              color={isDarkMode ? Colors.active : Colors.secondary}
              title={`Upload Passport`}
              titleStyle={[
                style.b18,
                { color: isDarkMode ? Colors.secondary : Colors.active },
              ]}
              centerTitle={true}
              elevation={0}
              leading={
                <TouchableOpacity
                  onPress={() =>
                    router.replace(
                      `/PetDetails/PetDetailPage?id=${petData?.id})`
                    )
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
            <AppForm
              initialValues={{ passport: null }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <AppErrorMessage error={error} visible={errorVisible} />
              <AppFormPassportPicker name={"passport"} />
              <SubmitButton title="Upload" style={style} />
            </AppForm>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    margin: 6,
    borderRadius: 10,
    fontFamily: "Avenir-bold",
  },
});
