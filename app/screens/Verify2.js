import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import style from "../theme/style";
import { Colors } from "../theme/color";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import OtpInputs from "react-native-otp-textinput"; // Changed to expo-compatible OTP input

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Verify2() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={[
        style.area,
        { backgroundColor: Colors.secondary, paddingTop: "15%" },
      ]}
    >
      <View style={[style.main, { backgroundColor: Colors.secondary }]}>
        <AppBar
          color={Colors.secondary}
          title="Phone Verification"
          titleStyle={[style.apptitle, { color: Colors.active }]}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity onPress={() => navigation.navigate("Verify1")}>
              <Icon name="chevron-back" color={Colors.active} size={25} />
            </TouchableOpacity>
          }
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[style.r14, { color: Colors.disable1, marginTop: 15 }]}>
            Enter your OTP code here
          </Text>
          <View style={{ paddingTop: 20 }}>
            <OtpInputs
              tintColor={Colors.primary}
              offTintColor={Colors.secondary}
              inputCount={6}
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
          <TouchableOpacity
            style={{ marginTop: 5 }}
            // onPress={() => navigation.navigate("Verify1")}
          >
            <Text
              style={[
                style.r14,
                { color: Colors.primary, textDecorationLine: "underline" },
              ]}
            >
              Click Resend.
            </Text>
          </TouchableOpacity>
          <View style={{ paddingVertical: 20 }}>
            <TouchableOpacity
              //   onPress={() => navigation.navigate("Signup")}
              style={style.btn}
            >
              <Text style={style.btntxt}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
