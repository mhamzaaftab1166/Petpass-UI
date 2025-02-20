import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import { useTheme } from "../../helper/themeProvider";
import genderLight from "../../../assets/images/pets/genderLight.png";
import breedLight from "../../../assets/images/pets/breedLight.png";
import birthDark from "../../../assets/images/pets/birthDark.png";
import birthLight from "../../../assets/images/pets/birthLight.png";
import petEdit from "../../../assets/images/pets/petEdit.png";

const Bio = ({ router }) => {
  const { isDarkMode } = useTheme();
  return (
    <View style={{ marginVertical: 10 }}>
      <Pressable
        onPress={() => router.push("/PetDetails/PetEditForms/BioEdit")}
        style={styles.editIconContainer}
      >
        <Image source={petEdit} style={styles.editIcon} />
      </Pressable>

      <View style={styles.topRow}>
        <Text
          style={[
            style.r16,
            styles.nameText,
            { color: isDarkMode ? Colors.secondary : Colors.active },
          ]}
        >
          Tommy Gulf (Dog)
        </Text>
        <View style={styles.genderContainer}>
          <Image
            source={genderLight}
            style={{ width: 18, height: 18, marginRight: 6 }}
          />
          <Text
            style={[
              styles.genderText,
              { color: isDarkMode ? Colors.secondary : Colors.lable },
            ]}
          >
            Male
          </Text>
        </View>
      </View>
      <View style={[styles.topRow, { marginTop: 10, marginBottom: 20 }]}>
        <View style={styles.detailRow}>
          <Image source={breedLight} style={styles.icon} />
          <Text
            style={[
              styles.detailText,
              { color: isDarkMode ? Colors.secondary : Colors.lable },
            ]}
          >
            Cairn Terrier
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Image
            source={isDarkMode ? birthDark : birthLight}
            style={styles.icon}
          />
          <Text
            style={[
              styles.detailText,
              { color: isDarkMode ? Colors.secondary : Colors.lable },
            ]}
          >
            September 04/2018
          </Text>
        </View>
      </View>
      <View style={[style.divider, { marginTop: 10 }]}></View>
    </View>
  );
};

export default Bio;

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameText: {
    fontFamily: "Avenir-Bold",
  },
  genderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  genderText: {
    marginLeft: 5,
    fontSize: 18,
    fontFamily: "Avenir-Regular",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  editIconContainer: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  editIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.primary,
  },
});
