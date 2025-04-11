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
import Loader from "../../../components/Loader/Loader";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import BreedMultiSelect from "../../../components/MultiSelect/MultiSelect";
import usePetTypesAndBreeds from "../../../hooks/usePetFilters";
import { useTheme } from "../../../helper/themeProvider";

const { width, height } = Dimensions.get("window");

export default function FilterDrawer({ visible, onClose, onApplyFilters }) {
  const { isDarkMode } = useTheme();
  const drawerAnim = useRef(new Animated.Value(width)).current;
  const [selectedUserTypes, setSelectedUserTypes] = useState([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedPetTypes, setSelectedPetTypes] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const { petTypes, petBreeds, loading } = usePetTypesAndBreeds(selectedPetTypes);

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

  const handleClose = () => {
    setSelectedUserTypes([]);
    setSelectedAgeRanges([]);
    setSelectedLocations([]);
    setSelectedPetTypes([]);
    setSelectedBreeds([]);
    if (onClose) {
      onClose();
    }
  };

  const handleApplyFilters = () => {
    const allSelectedFilters = {
      userType: selectedUserTypes.map((opt) => opt.value),
      petAgeRange: selectedAgeRanges.map((opt) => opt.value),
      petLocation: selectedLocations.map((opt) => opt.value),
      petType: selectedPetTypes.map((opt) => opt.value),
      petBreed: selectedBreeds,
    };

    if (onApplyFilters) {
      onApplyFilters(allSelectedFilters);
    }
    handleClose();
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
               backgroundColor: isDarkMode ? Colors.dark : Colors.secondary
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={[styles.drawerTitle,{color: isDarkMode ? Colors.secondary : Colors.active,}]}>Filter Options</Text>
            <TouchableOpacity onPress={handleClose}>
              <AntDesign name="close" size={28} color={isDarkMode ? Colors.secondary : Colors.active} />
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
                isOneSelected={true}
              />
            )}
            {petBreeds.length > 0 && (
              <BreedMultiSelect
                data={petBreeds}
                value={selectedBreeds}
                onChange={(item) => setSelectedBreeds(item)}
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
    paddingBottom: 20,
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
  }
});
