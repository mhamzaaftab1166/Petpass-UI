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
import React, { useEffect, useState } from "react";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../../theme/color";
import style from "../../../theme/style";
import { useLocalSearchParams, useRouter } from "expo-router";
import AppErrorMessage from "../../../components/forms/AppErrorMessage";
import AppFormField from "../../../components/forms/AppFormFeild";
import AppFormPhoneField from "../../../components/forms/AppFormPhoneFeild";
import AppForm from "../../../components/forms/AppForm";
import AppFormPicker from "../../../components/forms/AppFormPicker";
import * as Yup from "yup";
import SubmitButton from "../../../components/forms/SubmitButton";
import { useTheme } from "../../../helper/themeProvider";
import addressService from "../../../services/addressService";
import Loader from "../../../components/Loader/Loader";
import useUserStore from "../../../store/useUserStore";
import useAddressStore from "../../../store/useAddressStore";
import { getCitiesByCountry, getCountries } from "../../../utils/getRegions";

const validationSchema = Yup.object({
  full_name: Yup.string().required().min(2).max(50),
  address: Yup.string().required().min(5),
  city: Yup.object().required(),
  country: Yup.object().required(),
  phone_number: Yup.string().required().min(8).max(15).label("Phone"),
});

export default function AddressFrom() {
  const router = useRouter();
  const { user } = useUserStore();
  const { isDarkMode } = useTheme();
  const [error, setError] = useState();
  const [country, setCountry] = useState();
  const [cities, setCities] = useState()
  const {
    loading,
    singleAddress,
    fetchAddress,
    fetchCurrentAddress,
    clearSingleAddress,
  } = useAddressStore();
  const [isLoading, setIsLoading] = useState(false);
  const { userId, addressId, isEdit } = useLocalSearchParams();
  const [errorVisible, setErrorVisible] = useState(false);
  const countriesData = getCountries?.map((country) => ({
    label: country?.name?.toLocaleUpperCase(),
    value: country?.name,
    code: country?.isoCode
  }));


  
  useEffect(() => {
    clearSingleAddress();
  }, [clearSingleAddress]);

  useEffect(() => {
    if (country) {
       const cityList = getCitiesByCountry(country) || [];
       console.log(cityList, 'cityList');
       
       const cities = cityList.map((city) => ({
          label: city?.name,
          value: city?.name,
       }));
       setCities(cities);
    }
 }, [country]);



  const handleSubmit = async (values) => {
    const phoneParts = values.phone_number.split(" ");
    const countryCode = phoneParts[0];
    const phoneNumber = phoneParts.slice(1).join("");
    
    const formattedValues = {
      ...values,
      country_code: countryCode,
      phone_number: phoneNumber,
      city: values.city.value,
      country: values.country.label,
    };

    const formattedupdateValues = {
      ...values,
      userId: userId,
      addressId: addressId,
      country_code: countryCode,
      phone_number: phoneNumber,
      city: values.city.value,
      country: values.country.label,
    };

    try {
      setIsLoading(true);
      isEdit
        ? await addressService.updateUserAddress(formattedupdateValues)
        : await addressService.createUserAddress(formattedValues);
        router.replace("/MyAccount/screens/Addresses");
    } catch (error) {
      setErrorVisible(true);
      setError(error.message);
    } finally {
      fetchAddress(user?.id); 
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentAddress(userId, addressId);
  }, [userId, addressId]);

  if (loading) {
    return <Loader isLoad={loading} />;
  }  

  return (
    <SafeAreaView
      style={[
        style.area,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <Loader isLoad={isLoading} />
        <View
          style={[
            style.main,
            {
              backgroundColor: isDarkMode ? Colors.active : Colors.secondary,
              marginTop: 10,
            },
          ]}
        >
          <AppBar
            color={isDarkMode ? Colors.active : Colors.secondary}
            title={`${isEdit ? "Edit" : "New"} Address`}
            titleStyle={[
              style.b18,
              { color: isDarkMode ? Colors.secondary : Colors.active },
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

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 10 }}
          >
            <AppForm
              initialValues={{
                full_name: isEdit ? singleAddress?.full_name : "",
                address: isEdit ? singleAddress?.address : "",
                phone_number: isEdit ? `${singleAddress?.country_code} ${singleAddress?.phone_number}` : "",
                city: isEdit
                  ? { label: singleAddress?.city, value: singleAddress?.city }
                  : "",
                country: isEdit
                  ? {
                      label: singleAddress?.country,
                      value: singleAddress?.country,
                    }
                  : "",
              }}
              onSubmit={(values) => handleSubmit(values)}
              validationSchema={validationSchema}
            >
              <AppErrorMessage error={error} visible={errorVisible} />

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
                items={countriesData}
                name={"country"}
                placeholder={"COUNTRY"}
                setState={(selected) => setCountry(selected?.code)}
              />

              <AppFormPicker
                items={cities}
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
