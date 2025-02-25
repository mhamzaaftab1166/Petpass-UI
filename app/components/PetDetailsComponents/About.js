import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import { useTheme } from "../../helper/themeProvider";
import petEdit from "../../../assets/images/pets/petEdit.png";
import InfoItem from "../InfoItem/InfoItem";
import BoxItem from "../BoxItem/BoxItem";

const About = ({  router, pet }) => {
  const { isDarkMode } = useTheme();
  console.log(pet);

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
          {`About ${pet?.pet_name}`}
        </Text>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/PetDetails/PetEditForms/AboutEdit",
              params: { pet: JSON.stringify(pet) },
            })
          }
        >
          <Image source={petEdit} style={{ width: 20, height: 20 }} />
        </Pressable>
      </View>

      <InfoItem label="Color" value={pet?.color || "Not Provided"} />
      <InfoItem label="Neutered" value={pet?.nuetered || "Not Provided"} />
      <InfoItem
        label="Physically Active"
        value={pet?.physically_active || "Not Provided"}
      />
      <InfoItem
        label="Microchip Number"
        value={pet?.microchip_number || "Not Provided"}
      />

      <View style={styles.boxContainer}>
        <BoxItem
          label="Age"
          value={`${pet?.age?.years || 0}y - ${pet?.age?.months}m`}
          bgColor="#D9F3F7"
          textColor="#53A2B1"
        />
        <BoxItem
          label="Weight"
          value={
            `${pet?.weight?.from || 0} - ${pet?.weight?.to || 0}` ||
            "Not Provided"
          }
          bgColor="#FCE9D8"
          textColor="#E5A16F"
        />
        <BoxItem
          label="Height"
          value={
            `${pet?.height?.from || 0} - ${pet?.height?.to || 0}` ||
            "Not Provided"
          }
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
