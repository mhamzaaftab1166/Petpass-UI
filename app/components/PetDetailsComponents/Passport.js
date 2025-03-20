import { View, Text, Image, Pressable, Modal, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../theme/color";
import petEdit from "../../../assets/images/pets/passport.png";
import { useTheme } from "../../helper/themeProvider";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

const Passport = ({ pet, router }) => {
  const { isDarkMode } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const passportUrl = pet?.pet_passport?.passport;
  console.log(passportUrl);
  
  const isImage = passportUrl?.match(/\.(jpeg|jpg|png)$/i);

  return (
    <View style={{ marginTop: 20, marginBottom: 40 }}>
      <View style={styles.headerContainer}>
        <Text
          style={[
            styles.headerText,
            { color: isDarkMode ? Colors.secondary : Colors.active },
          ]}
        >
          {`${pet?.pet_name}'s Passport`}
        </Text>

        <View style={styles.iconContainer}>
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

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              {
                backgroundColor: isDarkMode ? Colors.active : Colors.secondary,
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Passport Viewer</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <Ionicons name="close-circle" size={30} color="#fff" />
              </Pressable>
            </View>

            <View style={styles.contentContainer}>
              {isImage ? (
                <Image
                  source={{ uri: passportUrl }}
                  style={styles.imageStyle}
                />
              ) : (
                <WebView
                  source={{ uri: passportUrl }}
                  style={styles.webviewStyle}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 16,
    fontFamily: "Avenir-Bold",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 500,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  modalTitle: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Avenir-Bold",
  },
  contentContainer: {
    padding: 15,
  },
  imageStyle: {
    width: "100%",
    height: 400,
    borderRadius: 8,
    resizeMode: "stretch",
  },
  webviewStyle: {
    width: "100%",
    height: 400,
    borderRadius: 8,
  },
});

export default Passport;
