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
import { useTheme } from "../../../helper/themeProvider";
import { Colors } from "../../../theme/color";
import style from "../../../theme/style";
import eventsService from "../../../services/eventsService";
import {
  formatDateRange,
  formatDayRange,
  formatMonthRange,
  formatTimeRange,
} from "../../../utils/generalUtils";
import AppSkeleton from "../../../components/AppSkeleton";
import NoItem from "../../../components/NoItem/NoItem";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PILL_COLORS = ["#FF6B6B", "#FFD166", "#4D96FF", "#9C27B0", "#00BFA5"];

export default function Events() {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);

  const themedStyles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          setLoading(true);
          const data = await eventsService.getUpcommingEvents();
          setEvents(data?.upcoming_events);
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      })();
    }, [])
  );

  const handlePress = ({ id }) => {
    router.push({
      pathname: "/GeneralScreens/Home/events/EventDetail",
      params: { id },
    });
  };

  const renderSkeleton = () =>
    Array.from({ length: 5 }).map((_, i) => (
      <View key={i} style={themedStyles.card}>
        <View style={themedStyles.left}>
          <AppSkeleton width="80%" height={12} />
          <AppSkeleton width="60%" height={12} style={{ marginVertical: 6 }} />
          <AppSkeleton width="50%" height={12} />
        </View>
        <View style={themedStyles.divider} />
        <View style={themedStyles.right}>
          <AppSkeleton width="90%" height={14} />
          <AppSkeleton width="70%" height={12} style={{ marginTop: 6 }} />
        </View>
      </View>
    ));

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
        {loading && renderSkeleton()}
        {events.length === 0 && !loading && (
          <View style={{ marginTop:"50%" }}>
            <NoItem title={"Events"} />
          </View>
        )}
        {!loading &&
          !error &&
          events.map((ev, i) => {
            const timeLabel = formatTimeRange(ev?.start_time, ev?.end_time);
            const monthLabel = formatMonthRange(ev.start_date, ev.end_date);
            const dateLabel = formatDateRange(ev.start_date, ev.end_date);
            const dayLabel = formatDayRange(ev.start_date, ev.end_date);
            return (
              <TouchableOpacity
                key={i}
                onPress={() => handlePress(ev)}
                activeOpacity={0.7}
                style={themedStyles.card}
              >
                <View style={themedStyles.left}>
                  <View
                    style={[
                      themedStyles.pill,
                      { backgroundColor: PILL_COLORS[i % PILL_COLORS.length] },
                    ]}
                  >
                    <Text style={themedStyles.pillText}>{dayLabel}</Text>
                  </View>
                  <Text style={themedStyles.month}>{monthLabel}</Text>
                  <Text style={themedStyles.dateNum}>{dateLabel}</Text>
                </View>

                <View style={themedStyles.divider} />

                <View style={themedStyles.right}>
                  <Text style={themedStyles.title}>{ev?.event_title}</Text>
                  <View style={themedStyles.timeRow}>
                    <Icon name="time-outline" size={16} color={Colors.lable} />
                    <Text style={themedStyles.timeText}>{timeLabel}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
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
      height: 120,
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
      width: "40%",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: 12,
    },
    pill: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      marginBottom: 6,
    },
    pillText: {
      color: Colors.secondary,
      fontFamily: "Avenir-Bold",
      fontSize: 11,
      padding: 2,
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
      width: 2,
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
