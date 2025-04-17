// FilterCategory.js
import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Colors } from "../../../theme/color";
import { useTheme } from "../../../helper/themeProvider";

export default function FilterCategory({
  title,
  options,
  selectedValues = [],
  onSelectionChange,
  isOneSelected = false,
}) {
  const { isDarkMode } = useTheme();

  const toggleOption = (option) => {
    let newSelected = [];

    if (isOneSelected) {
      if (selectedValues.some((o) => o.value === option.value)) {
        newSelected = [];
      } else {
        newSelected = [option];
      }
    } else {
      if (selectedValues.some((o) => o.value === option.value)) {
        newSelected = selectedValues.filter((o) => o.value !== option.value);
      } else {
        newSelected = [...selectedValues, option];
      }
    }

    onSelectionChange(newSelected);
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.filterCategoryContainer}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => {
          const selected = selectedValues.some((o) => o.value === option.value);
          return (
            <TouchableWithoutFeedback
              key={option.value}
              onPress={() => toggleOption(option)}
            >
              <View
                style={[styles.optionLabel, selected && styles.optionSelected]}
              >
                <Text
                  style={[
                    styles.optionText,
                    selected && styles.optionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
}

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    filterCategoryContainer: {
      marginVertical: 10,
    },
    categoryTitle: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 12,
      color: isDarkMode ? Colors.white : Colors.active,
    },
    optionsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    optionLabel: {
      borderWidth: 1,
      borderColor: isDarkMode ? Colors.white : Colors.active,
      borderRadius: 20,
      paddingVertical: 6,
      paddingHorizontal: 12,
      marginRight: 8,
      marginBottom: 8,
      backgroundColor: isDarkMode ? Colors.dark : Colors.secondary,
    },
    optionSelected: {
      backgroundColor: Colors.primary,
      borderColor: isDarkMode ? Colors.dark : Colors.secondary,
    },
    optionText: {
      fontSize: 14,
      color: isDarkMode ? Colors.white : Colors.active,
      fontFamily: "Avenir-Regular",
    },
    optionTextSelected: {
      color: Colors.secondary,
      fontFamily: "Avenir-Regular",
    },
  });
