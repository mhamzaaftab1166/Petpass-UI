import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import homeService from "../../services/homeService";
import Loader from "../../components/Loader/Loader";
import { formatTipDate } from "../../utils/generalUtils";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Post() {
  const { id } = useLocalSearchParams();
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const fetchTip = async () => {
        try {
          setLoading(true);
          setError(null);
          const data = await homeService.getTipById(id);
          setTip(data?.petTip);
        } catch (err) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchTip();
    }, [id])
  );

  if(loading)return <Loader isLoad={loading}/>

  return (
    <SafeAreaView style={[style.area, { backgroundColor: Colors.secondary }]}>
      <View style={[style.main, { backgroundColor: Colors.secondary }]}>
        <AppBar
          color={Colors.secondary}
          elevation={0}
          leading={
            <TouchableOpacity onPress={() => router.back()}>
              <Icon name="chevron-back" color={Colors.active} size={30} />
            </TouchableOpacity>
          }
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[style.title, { color: Colors.active, marginTop: 20 }]}>
            {tip?.title}
          </Text>
          <Text style={[style.r14, { color: Colors.disable, marginTop: 10 }]}>
            {tip?.created_at ? formatTipDate(tip.created_at) : "Unknown time"}
          </Text>
          <Text
            style={[style.r16, { color: Colors.active, marginVertical: 15 }]}
          >
            {tip?.overview}
          </Text>
          {tip?.image && (
            <Image
              source={{ uri: tip.image }}
              style={{
                resizeMode: "cover",
                height: height / 5,
                width: width / 1.15,
                alignSelf: "center",
                width: "100%",
                borderRadius:10
              }}
            />
          )}
          <Text style={[style.r16, { color: Colors.active, marginTop: 15 }]}>
            {tip?.description}
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
