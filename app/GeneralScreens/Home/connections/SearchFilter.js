import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../theme/color";

const { width } = Dimensions.get("window");

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
            {
              color: isDarkMode ? Colors.active : Colors.active,
            },
          ]}
          placeholder="Search..."
          placeholderTextColor={isDarkMode ? Colors.lable : Colors.disable}
          value={searchText}
          onChangeText={onSearchChange}
        />
      </View>

      <TouchableOpacity
        style={styles.filterIconContainer}
        onPress={onFilterPress}
      >
        <Ionicons
          name="filter-circle"
          size={Platform.OS === "ios" ? 30 : 32}
          color={Colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.lable,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "ios" ? 10 : 6,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: width < 360 ? 14 : 16,
    paddingVertical: 0,
    fontFamily: "Avenir-SemiBold",
  },
  filterIconContainer: {
    padding: 5,
    paddingRight: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
