import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import style from "../theme/style";
import { Colors } from "../theme/color";
import OtpInputs from "react-native-otp-textinput";
import AppButton from "../components/AppButton/AppButton";
import AppTitle from "../components/AppTitle/AppTitle";
import authService from "../services/authService";
import AuthenticationSuccess from "../ESB/success/authentication.json";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import Loader from "../components/Loader/Loader";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Verify2() {
  const [error, setError] = useState();
  const [errorVisible, setErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { email, username, newPass } = useLocalSearchParams();
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const handleOtpChange = (otpCode) => {
    setOtp(otpCode);
  };

 const handleResend = async () => {
   try {
     setIsLoading(true);

     const requestData = {
       email,
       verification_type: newPass ? "password" : "email",
     };

     if (!newPass) {
       requestData.username = username;
     }

     await authService.resend(requestData);
   } catch (error) {
     setErrorVisible(true);
     setError(error.message);
   } finally {
     setIsLoading(false);
   }
 };


  const handleVerify = async () => {
    setIsLoading(true);
    try {
      if (email&&!newPass) {
        const data = await authService.emailVerify({ email, otp });
        if (AuthenticationSuccess.otpVerify === data?.message) {
          router.push("/Authentication/Login");
        }
      } else {
        router.push(`/Authentication/NewPassword?email=${email}`);
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
        { backgroundColor: Colors.secondary, paddingTop: "15%" },
      ]}
    >
      <Loader isLoad={isLoading} />
      <View style={[style.main, { backgroundColor: Colors.secondary }]}>
        <AppTitle title={"Email Verification"} style={style} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[style.r14, { color: Colors.disable1, marginTop: 15 }]}>
            Enter your OTP code here
          </Text>
          <AppErrorMessage error={error} visible={errorVisible} />
          <View style={{ paddingTop: 20 }}>
            <OtpInputs
              tintColor={Colors.primary}
              offTintColor={Colors.secondary}
              inputCount={6}
              handleTextChange={(code) => handleOtpChange(code)}
              keyboardType="numeric"
              textInputStyle={{
                borderBottomColor: Colors.primary,
                backgroundColor: Colors.secondary,
                textAlign: "center",
                height: 50,
                fontSize: 28,
                borderBottomWidth: 1,
                color: Colors.active,
                fontWeight: "bold",
              }}
            />
          </View>
          <Text style={[style.r14, { color: Colors.disable1, marginTop: 50 }]}>
            Didn't you receive any code?
          </Text>
          <TouchableOpacity style={{ marginTop: 5 }} onPress={handleResend}>
            <Text
              style={[
                style.r14,
                { color: Colors.primary, textDecorationLine: "underline" },
              ]}
            >
              Click Resend.
            </Text>
          </TouchableOpacity>
          <AppButton
            title="CONTINUE"
            disable={otp.length < 6}
            onPress={handleVerify}
            style={style}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
