import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../theme/color";

export default function SearchFilterBar({
  searchText,
  onSearchChange,
  onFilterPress,
  isDarkMode,
}) {
  return (
    <View style={styles.searchRow}>
      <View style={styles.searchInputContainer}>
        <Ionicons
          name="search"
          size={20}
          color={Colors.lable}
          style={styles.searchIcon}
        />
        <TextInput
          style={[
            styles.searchInput,
            { color: isDarkMode ? Colors.secondary : Colors.active },
          ]}
          placeholder="Search..."
          placeholderTextColor={isDarkMode ? Colors.secondary : Colors.disable}
          value={searchText}
          onChangeText={onSearchChange}
        />
      </View>
      <TouchableOpacity
        style={styles.filterIconContainer}
        onPress={onFilterPress}
      >
        <Ionicons name="filter-circle" size={35} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchInputContainer: {
    flex: 6,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.lable,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterIconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: 5,
  },
});
