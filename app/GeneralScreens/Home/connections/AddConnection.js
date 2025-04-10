import React, { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import style from "../../../theme/style";
import { Colors } from "../../../theme/color";
import { useTheme } from "../../../helper/themeProvider";
import SearchFilterBar from "./SearchFilter";

export default function AddConnections({ onFilterPress }) {
  const { isDarkMode } = useTheme();
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  return (
    <SafeAreaView
      style={[
        style.area,
        {
          flex: 1,
          backgroundColor: isDarkMode ? Colors.dark : Colors.secondary,
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <ScrollView>
          <SearchFilterBar
            searchText={searchText}
            onSearchChange={handleSearchChange}
            onFilterPress={onFilterPress} // pass click back to parent
            isDarkMode={isDarkMode}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
