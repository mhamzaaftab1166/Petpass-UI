import React, { useCallback, useState, useMemo } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import { router, useFocusEffect } from "expo-router";
import { useTheme } from "../../helper/themeProvider";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import bannerImage from "../../../assets/images/banner.jpg"; // your banner

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SIDE_PADDING = SCREEN_WIDTH * 0.05;

export default function EventDetails() {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // generate themed styles
  const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          setLoading(true);
          // fetch your details here…
          await new Promise((r) => setTimeout(r, 500));
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      })();
    }, [])
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* ====== Banner ====== */}
        <View>
          <Image source={bannerImage} style={styles.banner} />
          <View style={styles.overlay}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backBtn}
            >
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
        
          </View>
        </View>

        {/* ====== Description ====== */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>ABOUT</Text>
          <Text style={styles.cardText}>
            Join us for an unforgettable evening of music, dining, and
            networking at The Lalit Mumbai. Experience world‑class performances
            and immerse yourself in the vibrant atmosphere of India’s business
            capital.
          </Text>
        </View>

        {/* ====== Details (Location / Date & Time) ====== */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>LOCATION</Text>
          <Text style={styles.cardText}>
            Sahar Airport Road, Andheri East, Mumbai, Maharashtra 400059
          </Text>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.cardLabel}>DATE</Text>
              <Text style={styles.cardText}>28 Nov 2018</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.cardLabel}>TIME</Text>
              <Text style={styles.cardText}>11:30 AM – 5:00 PM</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.joinBtn}>
            <Text style={styles.joinText}>Join</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactBtn}>
            <Text style={styles.contactText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const BANNER_HEIGHT = 240;

const createStyles = (dark) => {
  const bg = dark ? Colors.dark : Colors.secondary;
  const cardBg = dark ? Colors.dark : Colors.secondary;
  const textPrimary = dark ? Colors.secondary : Colors.lable;
  const textSecondary = dark ? Colors.secondary : Colors.active;
  const borderColor = dark ? Colors.border : "rgba(0,0,0,0.05)";

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: bg,
    },
    scroll: {
      paddingBottom: 32,
    },
    banner: {
      width: "100%",
      height: BANNER_HEIGHT,
    },
    overlay: {
      position: "absolute",
      top: 24,
      left: SIDE_PADDING,
      right: SIDE_PADDING,
    },
    backBtn: {
      padding: 8,
    },
    card: {
      backgroundColor: cardBg,
      marginHorizontal: SIDE_PADDING,
      marginTop: 24,
      borderRadius: 5,
      padding: 20,
      borderWidth: 1,
      borderColor,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    cardLabel: {
      fontFamily: "Avenir-Bold",
      fontSize: 12,
      color: textSecondary,
      marginBottom: 8,
      letterSpacing: 0.5,
    },
    cardText: {
      fontFamily: "Avenir-Regular",
      fontSize: 14,
      color: textPrimary,
      lineHeight: 20,
      marginBottom: 16,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    column: {
      width: "48%",
    },
    // Actions
    actions: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 32,
      marginHorizontal: SIDE_PADDING,
    },
    joinBtn: {
      flex: 1,
      backgroundColor: Colors.primary,
      paddingVertical: 10,
      borderRadius: 15,
      marginRight: 12,
      alignItems: "center",
    },
    joinText: {
      fontFamily: "Avenir-Bold",
      fontSize: 16,
      color: Colors.secondary,
    },
    contactBtn: {
      flex: 1,
      borderWidth: 1,
      borderColor: Colors.primary,
      paddingVertical:10,
      borderRadius: 15,
      alignItems: "center",
    },
    contactText: {
      fontFamily: "Avenir-Bold",
      fontSize: 16,
      color: Colors.primary,
    },
  });
};
