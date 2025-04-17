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
import { AntDesign } from "@expo/vector-icons";
import BreedMultiSelect from "../../../components/MultiSelect/MultiSelect";
import usePetTypesAndBreeds from "../../../hooks/usePetFilters";
import { useTheme } from "../../../helper/themeProvider";

const { width, height } = Dimensions.get("window");

export default function FilterDrawer({
  visible,
  onClose,
  onApplyFilters,
  onClearFilter,
  filters,
}) {
  const { isDarkMode } = useTheme();
  const drawerAnim = useRef(new Animated.Value(width)).current;

  const [selectedUserTypes, setSelectedUserTypes] = useState([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedPetTypes, setSelectedPetTypes] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);

  const { petTypes, petBreeds, loading } =
    usePetTypesAndBreeds(selectedPetTypes);

  useEffect(() => {
    Animated.timing(drawerAnim, {
      toValue: visible ? 0 : width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    setSelectedUserTypes(
      userTypeOptions.filter((opt) => filters?.user_types?.includes(opt.value))
    );
    setSelectedAgeRanges(
      petAgeRangeOptions.filter((opt) => filters?.pet_ages?.includes(opt.value))
    );
    setSelectedLocations(
      petLocationOptions.filter((opt) =>
        filters?.locations?.includes(opt.value)
      )
    );
    setSelectedPetTypes(
      petTypes.filter((opt) => filters?.pet_types?.includes(opt.value))
    );
    setSelectedBreeds(filters?.pet_breeds || []);
  }, [visible, filters, petTypes]);

  if (!visible) return null;

  const statusBarHeight =
    Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) - 10 : 44;

  const areFiltersSelected = [
    filters?.locations,
    filters?.user_types,
    filters?.pet_ages,
    filters?.pet_types,
    filters?.pet_breeds,
  ].some((arr) => arr.length > 0);

  const handleClearFilters = () => {
    setSelectedUserTypes([]);
    setSelectedAgeRanges([]);
    setSelectedLocations([]);
    setSelectedPetTypes([]);
    setSelectedBreeds([]);
    onClearFilter?.();
  };

  const handleApplyFilters = () => {
    const allSelectedFilters = {
      user_types: selectedUserTypes.map((o) => o.value),
      pet_ages: selectedAgeRanges.map((o) => o.value),
      locations: selectedLocations.map((o) => o.value),
      pet_types: selectedPetTypes.map((o) => o.value),
      pet_breeds: selectedBreeds,
    };
    onApplyFilters?.(allSelectedFilters);
    onClose?.();
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
              backgroundColor: isDarkMode ? Colors.dark : Colors.secondary,
            },
          ]}
        >
          <View style={styles.header}>
            <Text
              style={[
                styles.drawerTitle,
                { color: isDarkMode ? Colors.secondary : Colors.active },
              ]}
            >
              Filter Options
            </Text>
            <TouchableOpacity onPress={onClose}>
              <AntDesign
                name="close"
                size={28}
                color={isDarkMode ? Colors.secondary : Colors.active}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            <FilterCategory
              title="User Type"
              options={userTypeOptions}
              selectedValues={selectedUserTypes}
              onSelectionChange={setSelectedUserTypes}
            />

            {petTypes.length > 0 && (
              <FilterCategory
                title="Pet Types"
                options={petTypes}
                isOneSelected
                selectedValues={selectedPetTypes}
                onSelectionChange={setSelectedPetTypes}
              />
            )}

            {petBreeds.length > 0 && (
              <BreedMultiSelect
                data={petBreeds}
                value={selectedBreeds}
                onChange={setSelectedBreeds}
              />
            )}

            <FilterCategory
              title="Pet Age Range"
              options={petAgeRangeOptions}
              selectedValues={selectedAgeRanges}
              onSelectionChange={setSelectedAgeRanges}
            />

            <FilterCategory
              title="Pet Location"
              options={petLocationOptions}
              selectedValues={selectedLocations}
              onSelectionChange={setSelectedLocations}
            />
          </ScrollView>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.applyButton]}
              onPress={handleApplyFilters}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.clearButton,
                !areFiltersSelected && styles.disabledButton,
              ]}
              onPress={handleClearFilters}
              disabled={!areFiltersSelected}
            >
              <Text style={styles.clearButtonText}>Clear Filters</Text>
            </TouchableOpacity>
          </View>
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
    height,
    width,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  drawer: {
    height: "100%",
    width: width * 0.8,
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
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  applyButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    marginBottom: "10%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButton: {
    flex: 1,
    backgroundColor: Colors.light,
    paddingVertical: 10,
    marginBottom: "10%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  applyButtonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontFamily: "Avenir-SemiBold",
  },
  clearButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: "Avenir-SemiBold",
  },
});
