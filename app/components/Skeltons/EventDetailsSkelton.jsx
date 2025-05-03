import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import AppSkeleton from "../AppSkeleton/index";
import React from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SIDE_PADDING = SCREEN_WIDTH * 0.05;
const BANNER_HEIGHT = 240;

const EventDetailsSkelton = ({ styles }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <AppSkeleton width={SCREEN_WIDTH} height={BANNER_HEIGHT} />
        <View style={{ paddingHorizontal: SIDE_PADDING, marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <AppSkeleton width={100} height={20} />
            <AppSkeleton width={100} height={20} />
          </View>
          <AppSkeleton width="100%" height={100} style={{ marginTop: 20 }} />
        </View>
        <View style={{ paddingHorizontal: SIDE_PADDING, marginTop: 20 }}>
          <AppSkeleton width="100%" height={80} />
        </View>
        <View style={{ paddingHorizontal: SIDE_PADDING, marginTop: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <AppSkeleton width="48%" height={40} />
            <AppSkeleton width="48%" height={40} />
          </View>
        </View>
        <View style={styles.actions}>
          <AppSkeleton width="48%" height={40} />
          <AppSkeleton width="48%" height={40} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventDetailsSkelton;

const styles = StyleSheet.create({});
