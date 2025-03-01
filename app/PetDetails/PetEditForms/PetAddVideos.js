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
import * as Yup from "yup";
import AppFormField from "../../components/forms/AppFormFeild";
import Icon from "react-native-vector-icons/Ionicons";
import SubmitButton from "../../components/forms/SubmitButton";
import AppErrorMessage from "../../components/forms/AppErrorMessage";
import { useTheme } from "../../helper/themeProvider";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import AppFormImagePicker from "../../components/forms/AppFormGeneralImagesPicker";
import { convertVideoToBase64 } from "../../utils/generalUtils";
import petServices from "../../services/petServices";
import Loader from "../../components/Loader/Loader";
import { AppBar } from "@react-native-material/core";

export default function PetAddVideos() {
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { isDarkMode } = useTheme();
  const { pet } = useLocalSearchParams();
  const petData = pet ? JSON.parse(pet) : null;
  const existingVideos = petData?.pet_gallery?.video || [];

  const validationSchema = Yup.object({
    videos: Yup.array()
      .test(
        "max-limit",
        "You can only upload up to 5 videos in total.",
        function (newVideos) {
          const totalVideos = existingVideos.length + (newVideos?.length || 0);
          return totalVideos <= 5;
        }
      )
      .min(1, "Please select at least one video.")
      .label("Videos"),
  });
  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const base64Videos = await Promise.all(
        values?.videos.map((video) => convertVideoToBase64(video))
      );
      const payload = {
        pet_id: petData?.id,
        videos_url: base64Videos,
        type: "videos",
      };
      const res = await petServices.addVideos(payload);
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
            title={`Add Pet Videos`}
            titleStyle={[
              style.b18,
              { color: isDarkMode ? Colors.secondary : Colors.active },
            ]}
            centerTitle={true}
            elevation={0}
            leading={
             <TouchableOpacity onPress={() => router.replace(`/PetDetails/PetDetailPage?id=${petData?.id})`)}>
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
              initialValues={{ videos: [] }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <View style={{ marginBottom: 30 }}>
                {/* <AppTitle title={"PET GALLERY"} style={style} /> */}
              </View>
              <AppErrorMessage error={error} visible={errorVisible} />
              <AppFormImagePicker name={"videos"} mediaType={"video"} />
              <SubmitButton title="SAVE" style={style} />
            </AppForm>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
