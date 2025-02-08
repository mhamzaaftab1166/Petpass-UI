import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../../theme/color";
import style from "../../../theme/style";
import { useRouter } from "expo-router";
import AppErrorMessage from "../../../components/forms/AppErrorMessage";
import AppFormField from "../../../components/forms/AppFormFeild";
import AppFormPhoneField from "../../../components/forms/AppFormPhoneFeild";
import AppForm from "../../../components/forms/AppForm";
import AppFormPicker from "../../../components/forms/AppFormPicker";
import * as Yup from "yup";
import SubmitButton from "../../../components/forms/SubmitButton";

const validationSchema = Yup.object({
  full_name: Yup.string().required().min(2).max(50),
  address: Yup.string().required().min(5),
  city: Yup.object().required(),
  country: Yup.object().required(),
  phone_number: Yup.string().required().min(8).max(15).label("Phone"),
});

export default function AddressFrom() {
  const router = useRouter();
  return (
    <SafeAreaView style={[style.area, { backgroundColor: Colors.secondary }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <View
          style={[
            style.main,
            { backgroundColor: Colors.secondary, marginTop: 10 },
          ]}
        >
          <AppBar
            color={Colors.secondary}
            title="New Address"
            titleStyle={[style.b18, { color: Colors.active }]}
            centerTitle={true}
            elevation={0}
            leading={
              <TouchableOpacity onPress={() => router.back()}>
                <Icon name="chevron-back" color={Colors.active} size={30} />
              </TouchableOpacity>
            }
          />

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 10 }}
          >
            <AppForm
              initialValues={{
                full_name: "",
                address: "",
                phone_number: "",
                city: "",
                country: "",
              }}
              onSubmit={(values) => console.log(values)}
              validationSchema={validationSchema}
            >
              <AppErrorMessage error={""} visible={false} />

              <AppFormField
                name={"full_name"}
                placeholder="FULL NAME"
                style={style}
              />
              <AppFormField
                name={"address"}
                placeholder="FULL ADDRESS"
                style={style}
              />
              <AppFormPhoneField style={style} name={"phone_number"} />
              <AppFormPicker
                items={[
                  { label: "PAKISTAN", value: "PAKISTAN" },
                  {
                    label: "UNITED ARAB EMIRATE",
                    value: "UNITED ARAB EMIRATE",
                  },
                ]}
                name={"country"}
                placeholder={"COUNTRY"}
              />

              <AppFormPicker
                items={[
                  { label: "LAHORE", value: "LAHORE" },
                  {
                    label: "DUBAI",
                    value: "DUBAI",
                  },
                ]}
                name={"city"}
                placeholder={"CITY"}
              />

              <SubmitButton title="SAVE" style={style} />
            </AppForm>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
