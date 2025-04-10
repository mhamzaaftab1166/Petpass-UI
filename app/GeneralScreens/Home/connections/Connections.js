import React, { useCallback, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import style from "../../../theme/style";
import { Colors } from "../../../theme/color";
import Icon from "react-native-vector-icons/Ionicons";
import { AppBar } from "@react-native-material/core";
import { useTheme } from "../../../helper/themeProvider";
import { router, useFocusEffect } from "expo-router";
import ConnectionTabs from "../../../components/Connections/Tabs";
import AddConnections from "./AddConnection";
import FilterDrawer from "./FilterDrawer";
import UserRequests from "./RequestConnections";

export default function Connections() {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("addConnections");

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleOpenFilter = () => setIsFilterVisible(true);
  const handleCloseFilter = () => setIsFilterVisible(false);

  useFocusEffect(
    useCallback(() => {
      const fetchVaccines = async () => {
        try {
          // load data
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchVaccines();
    }, [])
  );

  return (
    <SafeAreaView
      style={[
        style.area,
        { backgroundColor: isDarkMode ? Colors.dark : Colors.secondary },
      ]}
    >
      <View style={{ flex: 1 }}>
        <AppBar
          color={isDarkMode ? Colors.active : Colors.secondary}
          titleStyle={[
            style.apptitle,
            {
              color: isDarkMode ? Colors.secondary : Colors.active,
              fontFamily: "Avenir-Bold",
            },
          ]}
          centerTitle={true}
          elevation={0}
          title="Connections"
          leading={
            <TouchableOpacity onPress={() => router.back()}>
              <Icon
                name="chevron-back"
                color={isDarkMode ? Colors.secondary : Colors.active}
                size={30}
              />
            </TouchableOpacity>
          }
        />

        <View
          style={[
            style.main,
            { backgroundColor: isDarkMode ? Colors.dark : Colors.secondary },
          ]}
        >
          <ConnectionTabs
            selectedTab={selectedTab}
            onTabSelect={setSelectedTab}
          />

          {selectedTab === "addConnections" && (
            <AddConnections onFilterPress={handleOpenFilter} />
          )}

          {selectedTab === "request" && <UserRequests/>}
        </View>
      </View>

      <FilterDrawer visible={isFilterVisible} onClose={handleCloseFilter} />
    </SafeAreaView>
  );
}
