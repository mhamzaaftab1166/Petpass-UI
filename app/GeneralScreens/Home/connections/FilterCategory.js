import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Colors } from "../../../theme/color";
import { useTheme } from "../../../helper/themeProvider";

export default function FilterCategory({
  title,
  options,
  onSelectionChange,
  isOneSelected = false,
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { isDarkMode } = useTheme();

  const toggleOption = (option) => {
    let newSelected = [];

    if (isOneSelected) {
      if (selectedOptions.find((o) => o.value === option.value)) {
        newSelected = [];
      } else {
        newSelected = [option];
      }
    } else {
      if (selectedOptions.find((o) => o.value === option.value)) {
        newSelected = selectedOptions.filter((o) => o.value !== option.value);
      } else {
        newSelected = [...selectedOptions, option];
      }
    }

    setSelectedOptions(newSelected);
    onSelectionChange(newSelected);
  };

  const dynamicStyles = getStyles(isDarkMode);

  return (
    <View style={dynamicStyles.filterCategoryContainer}>
      <Text style={dynamicStyles.categoryTitle}>{title}</Text>
      <View style={dynamicStyles.optionsContainer}>
        {options.map((option) => {
          const selected = !!selectedOptions.find(
            (o) => o.value === option.value
          );
          return (
            <TouchableWithoutFeedback
              key={option.value}
              onPress={() => toggleOption(option)}
            >
              <View
                style={[
                  dynamicStyles.optionLabel,
                  selected && dynamicStyles.optionSelected,
                ]}
              >
                <Text
                  style={[
                    dynamicStyles.optionText,
                    selected && dynamicStyles.optionTextSelected,
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
