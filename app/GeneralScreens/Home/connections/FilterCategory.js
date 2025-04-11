// FilterCategory.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Colors } from "../../../theme/color";

export default function FilterCategory({ title, options, onSelectionChange }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (option) => {
    let newSelected = [];
    if (selectedOptions.find((o) => o.value === option.value)) {
      newSelected = selectedOptions.filter((o) => o.value !== option.value);
    } else {
      newSelected = [...selectedOptions, option];
    }
    setSelectedOptions(newSelected);
    onSelectionChange(newSelected);
  };

  return (
    <View style={styles.filterCategoryContainer}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => {
          const selected = !!selectedOptions.find((o) => o.value === option.value);
          return (
            <TouchableWithoutFeedback
              key={option.value}
              onPress={() => toggleOption(option)}
            >
              <View style={[styles.optionLabel, selected && styles.optionSelected]}>
                <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
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

const styles = StyleSheet.create({
  filterCategoryContainer: {
    marginVertical: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: Colors.active,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionLabel: {
    borderWidth: 1,
    borderColor: Colors.active,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: Colors.secondary,
  },
  optionSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.secondary,
  },
  optionText: {
    fontSize: 14,
    color: Colors.active,
    fontFamily: "Avenir-Regular",
  },
  optionTextSelected: {
    color: Colors.secondary,
  },
});
