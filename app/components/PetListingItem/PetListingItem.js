import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../theme/color";
import { useTheme } from "../../helper/themeProvider";
import { useRouter } from "expo-router";
import style from "../../theme/style";

import img from "../../../assets/images/profile/profile.png";
import birthLight from "../../../assets/images/pets/birthLight.png";
import breedLight from "../../../assets/images/pets/breedLight.png";
import genderLight from "../../../assets/images/pets/genderLight.png";
import genderDark from "../../../assets/images/pets/genderDark.png";
import locationLight from "../../../assets/images/pets/locationLight.png";
import locationDark from "../../../assets/images/pets/locationDark.png";
import birthDark from "../../../assets/images/pets/birthDark.png";
import detailcon from "../../../assets/images/pets/detailcon.png";
import breedDark from "../../../assets/images/pets/breedDark.png";

import { TouchableOpacity } from "react-native";
import { formatDate } from "../../utils/generalUtils";

const { width, height } = Dimensions.get("screen");

const PetListingItem = ({ pet }) => {
  console.log(pet);

  const router = useRouter();
  const { isDarkMode } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => router.push("/PetDetails/PetDetailPage")}
      style={styles.outerContainer}
    >
      <View style={styles.row}>
        <Image
          source={{ uri: pet?.pet_profile_picture }}
          resizeMode="contain"
          style={styles.profileImage}
        />

        <View style={styles.infoContainer}>
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

          {/** Location row with detail icon on the right */}
          <View style={[styles.detailRow, { justifyContent: "space-between" }]}>
            <View style={styles.locationContainer}>
              <Image
                source={isDarkMode ? locationDark : locationLight}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.detailText,
                  { color: isDarkMode ? Colors.secondary : Colors.lable },
                ]}
              >
                Dubai, United Arab Emirates
              </Text>
            </View>
            <Image source={detailcon} style={styles.detailIcon} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PetListingItem;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "transparent",
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    resizeMode: "stretch",
    height: height / 12,
    width: width / 5,
    borderRadius: "50%",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
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
  detailText: {
    fontSize: 16,
    fontFamily: "Avenir-Regular",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  detailIcon: {
    width: 22,
    height: 22,
  },
});
