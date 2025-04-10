import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../../theme/color";

const TabItem = ({ label, badge, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.tabItem, isSelected && styles.selectedTab]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {badge && (
        <View style={[styles.requestBadge, isSelected && styles.bagheActive]}>
          <Text
            style={[styles.requestBadgeText, isSelected && styles.textActive]}
          >
            {badge}
          </Text>
        </View>
      )}
      <Text style={[styles.tabText, isSelected && styles.selectedTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const ConnectionTabs = ({ selectedTab, onTabSelect }) => {
  return (
    <View style={styles.tabsContainer}>
      <TabItem
        label="Add Connect"
        isSelected={selectedTab === "addConnections"}
        onPress={() => onTabSelect("addConnections")}
      />
      <TabItem
        label="Request"
        badge="3"
        isSelected={selectedTab === "request"}
        onPress={() => onTabSelect("request")}
      />
      <TabItem
        label="Connects"
        badge="12"
        isSelected={selectedTab === "yourConnects"}
        onPress={() => onTabSelect("yourConnects")}
      />
    </View>
  );
};

export default ConnectionTabs;

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 10,
  },
  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  selectedTab: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabText: {
    fontFamily: "Avenir-SemiBold",
    fontSize: 14,
    color: Colors.lable,
    textAlign: "center",
  },
  selectedTabText: {
    color: Colors.secondary,
  },
  requestBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 5,
  },
  bagheActive: {
    backgroundColor: Colors.secondary,
  },
  textActive: {
    color: Colors.primary,
  },
  requestBadgeText: {
    color: Colors.secondary,
    fontSize: 12,
    fontFamily: "Avenir-Bold",
  },
});
