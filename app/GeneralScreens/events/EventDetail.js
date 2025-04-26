import React, {
  useCallback,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
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
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useTheme } from "../../helper/themeProvider";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import eventsService from "../../services/eventsService";
import { formatFullDateRange, formatTimeRange } from "../../utils/generalUtils";
import AppSkeleton from "../../components/AppSkeleton";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SIDE_PADDING = SCREEN_WIDTH * 0.05;
const BANNER_HEIGHT = 240;

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [event, setEvent] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          setLoading(true);
          const res = await eventsService.getUpcommingDetail(id);
          setEvent(res?.upcoming_event);
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      })();
    }, [id])
  );

  const imgs = event?.gallery_images || [];
  const sliderImages = imgs.length > 0 ? [...imgs, imgs[0]] : [];

  useEffect(() => {
    setCurrentIndex(0);
    scrollRef.current?.scrollTo({ x: 0, animated: false });
  }, [event?.gallery_images]);

  useEffect(() => {
    if (!sliderImages.length) return;
    const total = sliderImages.length;
    const timer = setInterval(() => {
      const next = currentIndex + 1;
      scrollRef.current?.scrollTo({ x: next * SCREEN_WIDTH, animated: true });

      if (next === total - 1) {
        setTimeout(() => {
          scrollRef.current?.scrollTo({ x: 0, animated: false });
          setCurrentIndex(0);
        }, 300); 
      } else {
        setCurrentIndex(next);
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex, sliderImages]);


  if (loading) {
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
  }

  const timeLabel = formatTimeRange(event?.start_time, event?.end_time);
  const dateLabel = formatFullDateRange(event?.start_date, event?.end_date);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={{ width: SCREEN_WIDTH, height: BANNER_HEIGHT }}
          >
            {sliderImages.map((uri, idx) => (
              <Image
                key={idx}
                source={{ uri }}
                style={{ width: SCREEN_WIDTH, height: BANNER_HEIGHT }}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          <View style={styles.overlay}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backBtn}
            >
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.cardLabel}>Description</Text>
            <Text style={[styles.cardLabel, { textAlign: "right" }]}>
              {event?.pet_types.join(", ")}
            </Text>
          </View>
          <Text style={styles.cardText}>{event?.event_description}</Text>
        </View>

        <View style={[style.divider, { marginHorizontal: SIDE_PADDING }]} />

        {/* Location / Date / Time */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>LOCATION</Text>
          <Text style={styles.cardText}>{event?.full_address}</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.cardLabel}>DATE</Text>
              <Text style={styles.cardText}>{dateLabel}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.cardLabel}>TIME</Text>
              <Text style={styles.cardText}>{timeLabel}</Text>
            </View>
          </View>
        </View>

        <View style={[style.divider, { marginHorizontal: SIDE_PADDING }]} />

        {/* Actions */}
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
      paddingHorizontal: 5,
      borderColor,
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
      paddingVertical: 10,
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
