import { View, Text, Image, Pressable, Modal } from "react-native";
import React, { useState } from "react";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import petEdit from "../../../assets/images/pets/passport.png";
import { useTheme } from "../../helper/themeProvider";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

const Passport = ({ pet, router }) => {
  const { isDarkMode } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const passportUrl = pet?.pet_passport?.passport;
  

  const isImage = passportUrl?.match(/\.(jpeg|jpg|png)$/i);

  return (
    <View style={{ marginTop: 20, marginBottom: 40 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            style.s16,
            {
              color: isDarkMode ? Colors.secondary : Colors.active,
              fontFamily: "Avenir-Bold",
            },
          ]}
        >
          {`${pet?.pet_name}'s Passport`}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          {passportUrl && (
            <Pressable onPress={() => setModalVisible(true)}>
              <Ionicons name="eye-outline" size={30} color={Colors.primary} />
            </Pressable>
          )}

          <Pressable
            onPress={() =>
              router.push({
                pathname: "/PetDetails/PetEditForms/PassportDetails",
                params: { pet: JSON.stringify(pet) },
              })
            }
          >
            <Image source={petEdit} style={{ width: 25, height: 25 }} />
          </Pressable>
        </View>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.7)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "90%",
             backgroundColor: isDarkMode
                              ? Colors.active
                              : Colors.secondary,
              borderRadius: 10,
              padding: 10,
              paddingBottom:20,
              alignItems: "center",
            }}
          >
            <Pressable
              onPress={() => setModalVisible(false)}
              style={{ alignSelf: "flex-end" }}
            >
              <Ionicons name="close-circle" size={30} color={Colors.primary} />
            </Pressable>

            {/* Display Image or PDF */}
            {isImage ? (
              <Image
                source={{ uri: passportUrl }}
                style={{
                  width: "100%",
                  height: 300,
                  resizeMode: "contain",
                  marginTop: 10,
                }}
              />
            ) : (
              <WebView
                source={{ uri: passportUrl }}
                style={{ width: "100%", height: 400, marginTop: 10 }}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Passport;
