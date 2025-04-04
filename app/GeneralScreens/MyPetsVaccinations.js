import React, { useCallback, useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
} from "react-native";
import style from "../theme/style";
import { Colors } from "../theme/color";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import { useTheme } from "../helper/themeProvider";
import { router, useFocusEffect } from "expo-router";
import petService from "../services/petServices";
import Loader from "../components/Loader/Loader";
import BoxItem from "../components/BoxItem/BoxItem";
import AppSkeleton from "../components/AppSkeleton";

export default function PetVaccinations() {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vaccines, setVaccines] = useState(null);
  useFocusEffect(
    useCallback(() => {
      const fetchVaccines = async () => {
        try {
          setLoading(true);
          setError(null);
          const data = await petService.getPetsVaccines();
          setVaccines(data.vaccination_details);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchVaccines();
    }, [])
  );

  const groupedVaccines = (Array.isArray(vaccines) ? vaccines : []).reduce(
    (groups, record) => {
      const petName = record.pet_name;
      if (!groups[petName]) {
        groups[petName] = [];
      }
      groups[petName].push(record);
      return groups;
    },
    {}
  );

  if (loading)
    return (
      <SafeAreaView
        style={[
          style.area,
          { backgroundColor: isDarkMode ? Colors.dark : Colors.secondary },
        ]}
      >
        <ScrollView>
          <View
            style={[
              style.main,
              {
                backgroundColor: isDarkMode ? Colors.dark : Colors.secondary,
                marginTop: 20,
              },
            ]}
          >
            {/* Pet Name Skeleton */}
            <AppSkeleton
              width={200}
              height={30}
              borderRadius={4}
              style={localStyles.marginBottom}
            />

            {/* First Vaccination Record */}
            <AppSkeleton
              width={150}
              height={25}
              borderRadius={4}
              style={localStyles.marginBottom}
            />
            <View style={localStyles.boxContainer}>
              <AppSkeleton width={"50%"} height={100} borderRadius={8} />
              <AppSkeleton width={"50%"} height={100} borderRadius={8} />
            </View>

            {/* Second Vaccination Record */}
            <AppSkeleton
              width={150}
              height={25}
              borderRadius={4}
              style={localStyles.marginTop}
            />
            <View style={localStyles.boxContainer}>
              <AppSkeleton width={"50%"} height={100} borderRadius={8} />
              <AppSkeleton width={"50%"} height={100} borderRadius={8} />
            </View>

            <AppSkeleton
              width={150}
              height={25}
              borderRadius={4}
              style={localStyles.marginTop}
            />
            <View style={localStyles.boxContainer}>
              <AppSkeleton width={"50%"} height={100} borderRadius={8} />
              <AppSkeleton width={"50%"} height={100} borderRadius={8} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  if (error) return <Text style={localStyles.errorText}>{error}</Text>;

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
            title="My Pets Vaccinations"
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

          {/* Loop through each pet group */}
          {Object.keys(groupedVaccines).map((petName) => (
            <View key={petName} style={localStyles.petContainer}>
              <Text
                style={[
                  localStyles.petName,
                  { color: isDarkMode ? Colors.secondary : Colors.active },
                ]}
              >
                {petName}
              </Text>

              {/* Loop through each vaccination for the pet */}
              {groupedVaccines[petName].map((vaccination) => (
                <View
                  key={vaccination.id}
                  style={localStyles.vaccinationContainer}
                >
                  <Text
                    style={[
                      localStyles.vaccinationTitle,
                      { color: isDarkMode ? Colors.secondary : Colors.lable },
                    ]}
                  >
                    {vaccination.vaccination_name}
                  </Text>
                  <View style={localStyles.boxContainer}>
                    <BoxItem
                      label="Vaccinated On"
                      value={
                        vaccination.vaccinated_date === "Invalid date"
                          ? "N/A"
                          : vaccination.vaccinated_date
                      }
                      bgColor="#D9F3F7"
                      textColor="#53A2B1"
                    />
                    <BoxItem
                      label="Next Due On"
                      value={vaccination.vaccination_next_date}
                      bgColor="#FDD9E1"
                      textColor="#E56789"
                    />
                  </View>
                </View>
              ))}
            </View>
          ))}
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
    marginTop: 20,
  },
});
