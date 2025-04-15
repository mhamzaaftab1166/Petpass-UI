import React, { useCallback, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
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
import Connected from "./ConnectedUsers";
import connectionService from "../../../services/connectionService";
import AppSkeleton from "../../../components/AppSkeleton";

const { width } = Dimensions.get("window");

export default function Connections() {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [showLoading, setshowLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [connects, setConnects] = useState([]);
  const [selectedTab, setSelectedTab] = useState("addConnections");
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleOpenFilter = () => setIsFilterVisible(true);
  const handleCloseFilter = () => setIsFilterVisible(false);

  useFocusEffect(
    useCallback(() => {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const usersData = await connectionService.getUsers();
          const requestsData = await connectionService.getRequesedUsers();
          const connectsData= await connectionService.getConnectedUsers();
          setUsers(usersData?.users);
          setRequests(requestsData?.connections);
          setConnects(connectsData?.connections);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
    }, [])
  );

  const handleRefetchUsers = async () => {
    const usersData = await connectionService.getUsers();
    console.log(usersData,"hhaaok");
    
    setUsers(usersData?.users);
  };


  if (loading && showLoading) {
    return (
      <SafeAreaView
        style={[
          style.area,
          {
            backgroundColor: isDarkMode ? Colors.dark : Colors.secondary,
            marginTop: 20,
          },
        ]}
      >
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* Skeleton Tabs (3 items) */}
          <View style={skeletonStyles.tabsContainer}>
            <AppSkeleton
              width={width * 0.3 - 8}
              height={30}
              borderRadius={15}
              style={{ marginRight: 8 }}
            />
            <AppSkeleton
              width={width * 0.3 - 8}
              height={30}
              borderRadius={15}
              style={{ marginRight: 8 }}
            />
            <AppSkeleton
              width={width * 0.3 - 8}
              height={30}
              borderRadius={15}
            />
          </View>

          <View style={{ marginVertical: 16 }}>
            <AppSkeleton width={width - 32} height={40} borderRadius={4} />
          </View>

          {Array.from({ length: 8 }).map((_, index) => (
            <View key={index} style={skeletonStyles.listRow}>
              <AppSkeleton width={50} height={50} borderRadius={25} />
              <View style={skeletonStyles.textContainer}>
                <AppSkeleton
                  width={width * 0.5}
                  height={20}
                  borderRadius={4}
                  style={{ marginBottom: 6 }}
                />
                <AppSkeleton width={width * 0.3} height={15} borderRadius={4} />
              </View>
              <AppSkeleton width={80} height={30} borderRadius={15} />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

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
            requestsCount={requests?.length}
            connectionCount={connects?.length}
            selectedTab={selectedTab}
            onTabSelect={setSelectedTab}
          />

          {selectedTab === "addConnections" && (
            <AddConnections
              users={users}
              onFilterPress={handleOpenFilter}
              onRequestSent={handleRefetchUsers}
            />
          )}

          {selectedTab === "request" && <UserRequests requests={requests} />}

          {selectedTab === "yourConnects" && <Connected connects={connects} />}
        </View>
      </View>

      <FilterDrawer
        visible={isFilterVisible}
        onClose={handleCloseFilter}
        onApplyFilters={(filters) => console.log(filters)}
      />
    </SafeAreaView>
  );
}

const skeletonStyles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
});
