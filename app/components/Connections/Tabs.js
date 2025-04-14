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
            numberOfLines={1}
          >
            {badge}
          </Text>
        </View>
      )}
      <Text
        style={[styles.tabText, isSelected && styles.selectedTabText]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const ConnectionTabs = ({ selectedTab, onTabSelect, requestsCount=0,connectionCount=0 }) => {
  return (
    <View style={styles.tabsContainer}>
      <TabItem
        label="Invite"
        isSelected={selectedTab === "addConnections"}
        onPress={() => onTabSelect("addConnections")}
      />
      <TabItem
        label="Requests"
        badge={requestsCount}
        isSelected={selectedTab === "request"}
        onPress={() => onTabSelect("request")}
      />
      <TabItem
        label="Connects"
        badge={connectionCount}
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tabItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    minWidth: 0,
    position: "relative", // Allow positioning of badge
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
    flexShrink: 1,
  },
  selectedTabText: {
    color: Colors.secondary,
  },
  requestBadge: {
  marginTop:5,
    position: "absolute",
    top: -15,
    right: -6,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: "center",
  },
  bagheActive: {
    backgroundColor: Colors.light,
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
