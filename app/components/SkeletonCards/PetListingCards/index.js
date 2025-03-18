import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { useTheme } from "../../../helper/themeProvider";
import birthLight from "../../../../assets/images/pets/birthLight.png";
import breedLight from "../../../../assets/images/pets/breedLight.png";
import genderLight from "../../../../assets/images/pets/genderLight.png";
import genderDark from "../../../../assets/images/pets/genderDark.png";
import locationLight from "../../../../assets/images/pets/locationLight.png";
import locationDark from "../../../../assets/images/pets/locationDark.png";
import birthDark from "../../../../assets/images/pets/birthDark.png";
import detailcon from "../../../../assets/images/pets/detailcon.png";
import breedDark from "../../../../assets/images/pets/breedDark.png";

import { TouchableOpacity } from "react-native";
import AppSkeleton from "../../AppSkeleton";

const { width, height } = Dimensions.get("screen");

const PetListingSkeletonCard = () => {
  const { isDarkMode } = useTheme();

  return (
    <TouchableOpacity style={styles.outerContainer}>
      <View style={styles.row}>
        <AppSkeleton width={80} height={80} borderRadius={50} />

        <View style={styles.infoContainer}>
          <View style={styles.topRow}>
            <AppSkeleton width={180} height={15} />

            <View style={styles.genderContainer}>
              <Image
                source={isDarkMode ? genderDark : genderLight}
                style={{ width: 18, height: 18, marginRight: 6 }}
              />
              <AppSkeleton width={30} height={10} />
            </View>
          </View>

          <View style={styles.detailRow}>
            <Image
              source={isDarkMode ? breedDark : breedLight}
              style={styles.icon}
            />
            <AppSkeleton width={100} height={10} />
          </View>

          <View style={styles.detailRow}>
            <Image
              source={isDarkMode ? birthDark : birthLight}
              style={styles.icon}
            />
            <AppSkeleton width={160} height={10} />
          </View>
          <View style={[styles.detailRow, { justifyContent: "space-between" }]}>
            <View style={styles.locationContainer}>
              <Image
                source={isDarkMode ? locationDark : locationLight}
                style={styles.icon}
              />
              <AppSkeleton width={180} height={10} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PetListingSkeletonCard;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "transparent",
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  profileImage: {
    resizeMode: "cover",
    height: 80,
    width: 80,
    borderRadius: 50,
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
    textTransform: "capitalize",
    width: 180,
  },
  genderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  genderText: {
    marginLeft: 1,
    fontSize: 14,
    fontFamily: "Avenir-Regular",
    textTransform: "capitalize",
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
    fontSize: 14,
    width: 200,
    fontFamily: "Avenir-Regular",
    textTransform: "capitalize",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  detailIcon: {
    width: 24,
    height: 24,
  },
});
