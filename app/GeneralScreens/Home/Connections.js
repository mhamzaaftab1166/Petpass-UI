import React, { useCallback, useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
} from "react-native";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import { useTheme } from "../../helper/themeProvider";
import { router, useFocusEffect } from "expo-router";


export default function PetVaccinations() {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useFocusEffect(
    useCallback(() => {
      const fetchVaccines = async () => {
        try {
       
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchVaccines();
    }, [])
  );

 

  return (
    <SafeAreaView
      style={[
        style.area,
        { backgroundColor: isDarkMode ? Colors.dark : Colors.secondary },
      ]}
    >
      <ScrollView style={{ flex: 1 }}>
        <View
          style={[
            style.main,
            { backgroundColor: isDarkMode ? Colors.dark : Colors.secondary },
          ]}
        >
          <AppBar
            color={isDarkMode ? Colors.active : Colors.secondary}
            titleStyle={[
              style.apptitle,
              {
                color: isDarkMode ? Colors.secondary : Colors.active,
                fontFamily: "Avenir-Bold",
              },
            ]}
            centerTitle={true}
            elevation={0}
            title="Connections"
            leading={
              <TouchableOpacity onPress={() => router.back()}>
                <Icon
                  name="chevron-back"
                  color={isDarkMode ? Colors.secondary : Colors.active}
                  size={30}
                />
              </TouchableOpacity>
            }
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  petContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  petName: {
    fontSize: 20,
    fontFamily: "Avenir-Bold",
    marginBottom: 10,
  },
  vaccinationContainer: {
    marginTop: 10,
  },
  vaccinationTitle: {
    fontSize: 16,
    fontFamily: "Avenir-SemiBold",
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 100,
  },
});
