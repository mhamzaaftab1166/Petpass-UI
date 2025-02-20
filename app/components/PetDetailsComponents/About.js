import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import { useTheme } from "../../helper/themeProvider";
import petEdit from "../../../assets/images/pets/petEdit.png";
import InfoItem from "../InfoItem/InfoItem";
import BoxItem from "../BoxItem/BoxItem";

const About = ({ title = "About Tommy Gulf", router }) => {
  const { isDarkMode } = useTheme();

  return (
    <View style={{ marginTop: 20 }}>
      <View style={styles.header}>
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
          onPress={() => router.push("/PetDetails/PetEditForms/AboutEdit")}
        >
          <Image source={petEdit} style={{ width: 20, height: 20 }} />
        </Pressable>
      </View>

      <InfoItem label="Color" value="Brown" />
      <InfoItem label="Neutered" value="No" />
      <InfoItem label="Physically Active" value="Very Active" />
      <InfoItem label="Microchip Number" value="12345678910" />

      <View style={styles.boxContainer}>
        <BoxItem
          label="Age"
          value="7 months"
          bgColor="#D9F3F7"
          textColor="#53A2B1"
        />
        <BoxItem
          label="Weight"
          value="25 KG"
          bgColor="#FCE9D8"
          textColor="#E5A16F"
        />
        <BoxItem
          label="Height"
          value="25 CM"
          bgColor="#FDD9E1"
          textColor="#E56789"
        />
      </View>

      <View style={[style.divider, { marginTop: 20 }]}></View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
});
