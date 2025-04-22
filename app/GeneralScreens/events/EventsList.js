import React, { useCallback, useState, useMemo } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import { router, useFocusEffect } from "expo-router";
import { useTheme } from "../../helper/themeProvider";
import { Colors } from "../../theme/color";
import style from "../../theme/style";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PILL_COLORS = ["#FF6B6B", "#FFD166", "#4D96FF", "#9C27B0", "#00BFA5"];

const DUMMY_EVENTS = [
  {
    day: "Monday",
    month: "September",
    dateNum: "25th",
    title: "Official Professional Preparation Days",
    time: "2:00 – 3:00 PM",
  },
  {
    day: "Tuesday",
    month: "September",
    dateNum: "26th",
    title: "Parents and Teacher's Association Meet",
    time: "9:00 – 10:00 AM",
  },
  {
    day: "Wednesday",
    month: "September",
    dateNum: "27th",
    title: "Parents' Conference Professional Development",
    time: "10:00 – 11:00 AM",
  },
  {
    day: "Thursday",
    month: "September",
    dateNum: "28th",
    title: "Gradeschool Quiz Bee Event",
    time: "2:00 – 3:00 PM",
  },
  {
    day: "Friday",
    month: "September",
    dateNum: "29th",
    title: "Teacher's Thanksgiving Event",
    time: "3:00 – 5:00 PM",
  },
];

export default function Events() {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const themedStyles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          setLoading(true);
          await new Promise((r) => setTimeout(r, 400));
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      })();
    }, [])
  );

  const handlePress = (ev) => {
    router.push("/GeneralScreens/events/EventDetail");
  };

  return (
    <SafeAreaView style={[themedStyles.container]}>
      <AppBar
        color={isDarkMode ? Colors.active : Colors.secondary}
        title="Upcoming Events"
        centerTitle
        elevation={0}
        titleStyle={[
          style.apptitle,
          {
            color: isDarkMode ? Colors.secondary : Colors.active,
            fontFamily: "Avenir-Bold",
          },
        ]}
        leading={() => (
          <TouchableOpacity onPress={() => router.back()}>
            <Icon
              name="chevron-back"
              size={28}
              color={isDarkMode ? Colors.secondary : Colors.active}
            />
          </TouchableOpacity>
        )}
      />

      <ScrollView contentContainerStyle={themedStyles.scroll}>

        {!loading &&
          !error &&
          DUMMY_EVENTS.map((ev, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => handlePress(ev)}
              activeOpacity={0.7}
              style={themedStyles.card}
            >
              {/* LEFT */}
              <View style={themedStyles.left}>
                <View
                  style={[
                    themedStyles.pill,
                    { backgroundColor: PILL_COLORS[i % PILL_COLORS.length] },
                  ]}
                >
                  <Text style={themedStyles.pillText}>
                    {ev.day.toUpperCase()}
                  </Text>
                </View>
                <Text style={themedStyles.month}>{ev.month}</Text>
                <Text style={themedStyles.dateNum}>{ev.dateNum}</Text>
              </View>

              {/* DIVIDER */}
              <View style={themedStyles.divider} />

              {/* RIGHT */}
              <View style={themedStyles.right}>
                <Text style={themedStyles.title}>{ev.title}</Text>
                <View style={themedStyles.timeRow}>
                  <Icon name="time-outline" size={16} color={Colors.lable} />
                  <Text style={themedStyles.timeText}>{ev.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (isDarkMode) => {
  const background = isDarkMode ? Colors.dark : Colors.secondary;
  const textColor = isDarkMode ? Colors.secondary : Colors.active;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: background,
    },
    scroll: {
      paddingHorizontal: SCREEN_WIDTH * 0.05,
      paddingVertical: 16,
    },
    card: {
      flexDirection: "row",
      height: 110,
      backgroundColor: background,
      borderRadius: 12,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
      borderWidth: isDarkMode ? 0.4 : 0,
      borderColor: Colors.border,
    },
    left: {
      width: "35%",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: 12,
    },
    pill: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderTopRightRadius: 5,
      borderBottomRightRadius:5,
      marginBottom: 6,
    },
    pillText: {
      color: Colors.secondary,
      fontFamily: "Avenir-Bold",
      fontSize: 11,
      padding:2
    },
    month: {
      fontFamily: "Avenir-Regular",
      fontSize: 12,
      color: textColor,
    },
    dateNum: {
      fontFamily: "Avenir-Bold",
      fontSize: 22,
      color: textColor,
      marginTop: 2,
    },
    divider: {
      width: 1,
      backgroundColor: Colors.border,
      marginVertical: 12,
    },
    right: {
      flex: 1,
      padding: 12,
      justifyContent: "center",
    },
    title: {
      fontFamily: "Avenir-Bold",
      fontSize: 14,
      color: textColor,
      marginBottom: 6,
    },
    timeRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    timeText: {
      fontFamily: "Avenir-Regular",
      fontSize: 12,
      color: Colors.lable,
      marginLeft: 6,
    },
  });
};
