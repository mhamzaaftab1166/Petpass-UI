import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import petEdit from "../../../assets/images/pets/petEdit.png";
import { useTheme } from "../../helper/themeProvider";
import BoxItem from "../BoxItem/BoxItem";
import { formatDate } from "../../utils/generalUtils";

const VaccinationDetail = ({ title = "Vaccination Record", router, pet }) => {
  const { isDarkMode } = useTheme();
  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            style.s16,
            {
              color: isDarkMode ? Colors.secondary : Colors.active,
              fontFamily: "Avenir-Bold",
            },
          ]}
        >
          {title}
        </Text>
        <Pressable
          onPress={() =>
            router.replace({
              pathname: "/PetDetails/PetEditForms/VaccinationEdit",
              params: { pet: JSON.stringify(pet) },
            })
          }
        >
          <Image source={petEdit} style={{ width: 20, height: 20 }} />
        </Pressable>
      </View>
      {pet?.vaccinations?.length > 0 ? (
        <View>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                color: isDarkMode ? Colors.secondary : Colors.lable,
                fontFamily: "Avenir-SemiBold",
                fontSize: 14,
              }}
            >
              {pet?.vaccinations[0]?.vaccination_name}
            </Text>
            <View style={styles.boxContainer}>
              <BoxItem
                label="Vaccinated On"
                value={
                  pet?.vaccinations[0]?.vaccinated_date === "0000-00-00"
                    ? "N/A"
                    : formatDate(pet?.vaccinations[0]?.vaccinated_date)
                }
                bgColor="#D9F3F7"
                textColor="#53A2B1"
              />
              <BoxItem
                label="Next Due On"
                value={formatDate(pet?.vaccinations[0]?.vaccination_next_date)}
                bgColor="#FDD9E1"
                textColor="#E56789"
              />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                color: isDarkMode ? Colors.secondary : Colors.lable,
                fontFamily: "Avenir-SemiBold",
                fontSize: 14,
              }}
            >
              {pet?.vaccinations[1]?.vaccination_name}
            </Text>
            <View style={styles.boxContainer}>
              <BoxItem
                label="Vaccinated On"
                value={
                  pet?.vaccinations[1]?.vaccinated_date === "0000-00-00"
                    ? "N/A"
                    : formatDate(pet?.vaccinations[1]?.vaccinated_date)
                }
                bgColor="#D9F3F7"
                textColor="#53A2B1"
              />
              <BoxItem
                label="Next Due On"
                value={formatDate(pet?.vaccinations[1]?.vaccination_next_date)}
                bgColor="#FDD9E1"
                textColor="#E56789"
              />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                color: isDarkMode ? Colors.secondary : Colors.lable,
                fontFamily: "Avenir-SemiBold",
                fontSize: 14,
              }}
            >
              {pet?.vaccinations[2]?.vaccination_name}
            </Text>
            <View style={styles.boxContainer}>
              <BoxItem
                label="Vaccinated On"
                value={
                  pet?.vaccinations[2]?.vaccinated_date === "0000-00-00"
                    ? "N/A"
                    : formatDate(pet?.vaccinations[2]?.vaccinated_date)
                }
                bgColor="#D9F3F7"
                textColor="#53A2B1"
              />
              <BoxItem
                label="Next Due On"
                value={formatDate(pet?.vaccinations[2]?.vaccination_next_date)}
                bgColor="#FDD9E1"
                textColor="#E56789"
              />
            </View>
          </View>
        </View>
      ) : (
        <Text
          style={[
            style.r16,
            {
              color: isDarkMode ? Colors.secondary : Colors.disable,
              marginTop: 10,
              fontFamily: "Avenir-Regular",
            },
          ]}
        >
          No Vaccination Record Found
        </Text>
      )}

      <View style={[style.divider, { marginTop: 20 }]}></View>
    </View>
  );
};

export default VaccinationDetail;

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
});
