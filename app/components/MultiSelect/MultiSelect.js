import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../theme/color";
import { useTheme } from "../../helper/themeProvider";

export default function BreedMultiSelect({ data, value, onChange }) {
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);

  const isSelected = (itemValue) => {
    return Array.isArray(value) && value.includes(itemValue);
  };

  return (
    <View style={styles.multiSelectContainer}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        activeColor={Colors.primary}
        search
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select breed"
        searchPlaceholder="Search..."
        value={value}
        onChange={onChange}
        renderLeftIcon={() => (
          <MaterialIcons
            style={styles.icon}
            color={Colors.primary}
            name="pets"
            size={20}
          />
        )}
        selectedStyle={styles.selectedStyle}
        renderItem={(item) => {
          const selected = isSelected(item.value);
          return (
            <View
              style={[
                styles.item,
                selected && { backgroundColor: Colors.primary },
              ]}
            >
              <Text
                style={[styles.itemText, selected && { color: Colors.white }]}
              >
                {item.label}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    multiSelectContainer: {
      marginVertical: 10,
    },
    dropdown: {
      height: 40,
      backgroundColor: isDarkMode ? Colors.dark : "transparent",
      borderBottomColor: isDarkMode ? Colors.white : "gray",
      borderBottomWidth: 0.5,
      marginBottom: 10,
    },
    placeholderStyle: {
      fontSize: 16,
      color: isDarkMode ? Colors.white : Colors.active,
      fontFamily: "Avenir-Regular",
    },
    selectedTextStyle: {
      fontSize: 14,
      color: isDarkMode ? Colors.white : Colors.active,
      fontFamily: "Avenir-Regular",
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      color: Colors.active,
      fontFamily: "Avenir-Regular",
      backgroundColor: Colors.light,
    },
    icon: {
      marginRight: 5,
    },
    selectedStyle: {
      borderRadius: 12,
      backgroundColor: isDarkMode ? Colors.dark : Colors.secondary,
    },
    item: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      backgroundColor: isDarkMode ? Colors.dark : Colors.secondary,
    },
    itemText: {
      fontSize: 16,
      color: isDarkMode ? Colors.white : Colors.active,
      fontFamily: "Avenir-Regular",
    },
  });
