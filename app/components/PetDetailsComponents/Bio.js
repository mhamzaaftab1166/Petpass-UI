import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import { useTheme } from "../../helper/themeProvider";
import genderLight from "../../../assets/images/pets/genderLight.png";
import breedLight from "../../../assets/images/pets/breedLight.png";
import genderDark from "../../../assets/images/pets/genderDark.png";
import breedDark from "../../../assets/images/pets/breedDark.png";
import birthDark from "../../../assets/images/pets/birthDark.png";
import birthLight from "../../../assets/images/pets/birthLight.png";
import { formatDate } from "../../utils/generalUtils";

const Bio = ({ router, pet }) => {
  const { isDarkMode } = useTheme();
  return ( 
    <View style={{ marginTop: 10 }}>
      <View style={styles.topRow}>
        <Text
          style={[
            style.r16,
            styles.nameText,
            { color: isDarkMode ? Colors.secondary : Colors.active },
          ]}
        >
          {`${pet?.pet_name} (${pet?.pet_type})`}
        </Text>
        <View style={styles.genderContainer}>
          <Image
            source={isDarkMode ? genderDark : genderLight}
            style={{ width: 18, height: 18, marginRight: 6 }}
          />
          <Text
            style={[
              styles.genderText,
              { color: isDarkMode ? Colors.secondary : Colors.lable },
            ]}
          >
            {pet?.gender}
          </Text>
        </View>
      </View>
      <View style={[styles.topRow, { marginTop: 10 }]}>
        <View style={styles.detailRow}>
          <Image
            source={isDarkMode ? breedDark : breedLight}
            style={styles.icon}
          />
          <Text
            style={[
              styles.detailText,
              { color: isDarkMode ? Colors.secondary : Colors.lable },
            ]}
          >
            {pet?.pet_breed}
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
            {formatDate(pet?.date_of_birth)}
          </Text>
        </View>
      </View>
      <View style={[style.divider, { marginTop: 20 }]}></View>
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
  detailText:{
   fontFamily: "Avenir-Regular",
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
