// FilterDrawer.js
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  Platform,
  ScrollView,
} from "react-native";
import { Colors } from "../../../theme/color";
import FilterCategory from "./FilterCategory";
import {
  petLocationOptions,
  userTypeOptions,
  petAgeRangeOptions,
} from "../../../constants/pet";
import petService from "../../../services/petServices";
import Loader from "../../../components/Loader/Loader";
import AntDesign from "@expo/vector-icons/AntDesign";

const { width, height } = Dimensions.get("window");

export default function FilterDrawer({ visible, onClose, onApplyFilters }) {
  const drawerAnim = useRef(new Animated.Value(width)).current;
  const [petTypes, setPetTypes] = useState([]);
  const [selectedUserTypes, setSelectedUserTypes] = useState([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedPetTypes, setSelectedPetTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    petService
      .getPetsTypes()
      .then((types) => {
        setPetTypes(types?.pet_types || []);
      })
      .catch((error) => {
        console.error("Error fetching pet types: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    Animated.timing(drawerAnim, {
      toValue: visible ? 0 : width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible, drawerAnim]);

  if (!visible) return null;

  const statusBarHeight =
    Platform.OS === "android"
      ? StatusBar.currentHeight
        ? StatusBar.currentHeight - 10
        : 0
      : 44;

 const handleApplyFilters = () => {
   const allSelectedFilters = {
     userType: selectedUserTypes.map((opt) => opt.value),
     petAgeRange: selectedAgeRanges.map((opt) => opt.value),
     petLocation: selectedLocations.map((opt) => opt.value),
     petType: selectedPetTypes.map((opt) => opt.value),
   };

   if (onApplyFilters) {
     onApplyFilters(allSelectedFilters);
   }
  handleClose();
 };


  const handleClose = () => {
    setSelectedUserTypes([]);
    setSelectedAgeRanges([]);
    setSelectedLocations([]);
    setSelectedPetTypes([]);
    if (onClose) {
      onClose();
    }
  };
  return (
    <TouchableWithoutFeedback>
      <View style={styles.overlay}>
        <Loader isLoad={loading} />
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{ translateX: drawerAnim }],
              paddingTop: statusBarHeight + 10,
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.drawerTitle}>Filter Options</Text>
            <TouchableOpacity onPress={handleClose}>
              <AntDesign name="close" size={28} color={Colors.active} />
            </TouchableOpacity>
          </View>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            <FilterCategory
              title="User Type"
              options={userTypeOptions}
              onSelectionChange={(selected) => setSelectedUserTypes(selected)}
            />
            {petTypes.length > 0 && (
              <FilterCategory
                title="Pet Types"
                options={petTypes}
                onSelectionChange={(selected) => setSelectedPetTypes(selected)}
              />
            )}
            <FilterCategory
              title="Pet Age Range"
              options={petAgeRangeOptions}
              onSelectionChange={(selected) => setSelectedAgeRanges(selected)}
            />
            <FilterCategory
              title="Pet Location"
              options={petLocationOptions}
              onSelectionChange={(selected) => setSelectedLocations(selected)}
            />
          </ScrollView>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApplyFilters}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: height,
    width: width,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  drawer: {
    height: "100%",
    width: width * 0.8,
    backgroundColor: Colors.secondary,
    padding: 20,
    paddingTop: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light,
  },
  drawerTitle: {
    fontSize: 20,
    fontFamily: "Avenir-Bold",
    color: Colors.active,
    textAlign: "left",
  },
  scrollViewContent: {
    paddingBottom: 20
  },
  applyButton: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  applyButtonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontFamily: "Avenir-SemiBold",
  },
});
