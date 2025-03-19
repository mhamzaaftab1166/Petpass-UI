import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import AppSkeleton from "../../AppSkeleton";
import { Colors } from "../../../theme/color";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export const PetDetailSkeleton = () => {
  return (
    <View>
      <AppSkeleton width={width} height={height / 3.2} />
      <View style={{ marginTop: 10, marginLeft: 20, marginRight: 20 }}>
        <View style={styles.topRow}>
          <AppSkeleton width={150} height={20} />

          <View style={styles.genderContainer}>
            <AppSkeleton width={80} height={20} />
          </View>
        </View>
        <View style={[styles.topRow, { marginTop: 10 }]}>
          <View style={styles.detailRow}>
            <AppSkeleton width={180} height={20} />
          </View>
          <View style={styles.detailRow}>
            <AppSkeleton width={100} height={20} />
          </View>
        </View>
        <View style={[styles.divider, { marginTop: 20 }]}></View>
        <View style={{ marginTop: 20 }}>
          <View style={styles.header}>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <AppSkeleton width={180} height={20} />
              <AppSkeleton width={150} height={20} />
            </View>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <AppSkeleton width={180} height={20} />
              <AppSkeleton width={150} height={20} />
            </View>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <AppSkeleton width={180} height={20} />
              <AppSkeleton width={150} height={20} />
            </View>
            <View>
              <AppSkeleton width={180} height={20} />
              <AppSkeleton width={120} height={20} />
            </View>
          </View>

          <View style={styles.boxContainer}>
            <AppSkeleton width={100} height={80} borderRadius={15} />
            <AppSkeleton width={100} height={80} borderRadius={15} />
            <AppSkeleton width={100} height={80} borderRadius={15} />
          </View>
          <View style={[styles.divider, { marginTop: 20 }]}></View>

          <View style={styles.boxContainer}>
            <AppSkeleton width={80} height={80} borderRadius={15} />
            <AppSkeleton width={80} height={80} borderRadius={15} />
            <AppSkeleton width={80} height={80} borderRadius={15} />
            <AppSkeleton width={80} height={80} borderRadius={15} />
            <AppSkeleton width={80} height={80} borderRadius={15} />
          </View>

          <View style={[styles.divider, { marginTop: 20 }]}></View>

          <View style={styles.boxContainer}>
            <AppSkeleton width={80} height={80} borderRadius={15} />
            <AppSkeleton width={80} height={80} borderRadius={15} />
            <AppSkeleton width={80} height={80} borderRadius={15} />
            <AppSkeleton width={80} height={80} borderRadius={15} />
            <AppSkeleton width={80} height={80} borderRadius={15} />
          </View>

          <View style={[styles.divider, { marginTop: 20 }]}></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Colors.border,
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
  detailText: {
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
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "start",
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
});
