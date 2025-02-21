import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import petEdit from "../../../assets/images/pets/petEdit.png";
import { useTheme } from "../../helper/themeProvider";
import BoxItem from "../BoxItem/BoxItem";

const VaccinationDetail = ({ title = "Vaccination Record", router }) => {
  const { isDarkMode } = useTheme();
  return (
    <View style={{ marginTop: 20 }}>
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
          {title}
        </Text>
        <Pressable
          onPress={() =>
            router.push("/PetDetails/PetEditForms/VaccinationEdit")
          }
        >
          <Image source={petEdit} style={{ width: 20, height: 20 }} />
        </Pressable>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            color: isDarkMode ? Colors.secondary : Colors.lable,
            fontFamily: "Avenir-SemiBold",
            fontSize: 14,
          }}
        >
          Nobivac KC
        </Text>
        <View style={styles.boxContainer}>
          <BoxItem
            label="Vaccinated On"
            value="21/01/2025"
            bgColor="#D9F3F7"
            textColor="#53A2B1"
          />
          <BoxItem
            label="Next Due On"
            value="21/01/2025"
            bgColor="#FDD9E1"
            textColor="#E56789"
          />
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            color: isDarkMode ? Colors.secondary : Colors.lable,
            fontFamily: "Avenir-SemiBold",
            fontSize: 14,
          }}
        >
          DHPPiL
        </Text>
        <View style={styles.boxContainer}>
          <BoxItem
            label="Vaccinated On"
            value="21/01/2025"
            bgColor="#D9F3F7"
            textColor="#53A2B1"
          />
          <BoxItem
            label="Next Due On"
            value="21/01/2025"
            bgColor="#FDD9E1"
            textColor="#E56789"
          />
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            color: isDarkMode ? Colors.secondary : Colors.lable,
            fontFamily: "Avenir-SemiBold",
            fontSize: 14,
          }}
        >
          Rabies
        </Text>
        <View style={styles.boxContainer}>
          <BoxItem
            label="Vaccinated On"
            value="21/01/2025"
            bgColor="#D9F3F7"
            textColor="#53A2B1"
          />
          <BoxItem
            label="Next Due On"
            value="21/01/2025"
            bgColor="#FDD9E1"
            textColor="#E56789"
          />
        </View>
      </View>

      <View style={[style.divider, { marginTop: 20 }]}></View>
    </View>
  );
};

export default VaccinationDetail;

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
});
