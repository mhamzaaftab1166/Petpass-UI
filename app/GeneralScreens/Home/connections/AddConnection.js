import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  RefreshControl,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import style from "../../../theme/style";
import { Colors } from "../../../theme/color";
import { useTheme } from "../../../helper/themeProvider";
import SearchFilterBar from "./SearchFilter";
import profilePicPlaceholder from "../../../../assets/images/profilePlaceHolder.png";
import NoItem from "../../../components/NoItem/NoItem";
import connectionService from "../../../services/connectionService";
import { useUserStore } from "../../../store/useStore";

export default function AddConnections({
  onFilterPress,
  onRequestSent,
  users = [],
}) {
  const { user } = useUserStore();
  const { isDarkMode } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [localUsers, setLocalUsers] = useState(users);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const handleConnect = async (userId) => {
    const index = localUsers.findIndex((u) => u.id === userId);
    if (index === -1) return;

    const previousStatus = localUsers[index].status;
    const optimisticStatus = previousStatus ? previousStatus : "pending";

    setLocalUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index] = {
        ...updatedUsers[index],
        status: optimisticStatus,
      };
      return updatedUsers;
    });

    try {
      await connectionService.sendInvite(user?.id, { receiver_id: userId });
      if (onRequestSent) {
        onRequestSent();
      }
    } catch (error) {
      console.log("Failed to send invite", error.message);
      setLocalUsers((prevUsers) => {
        const updatedUsers = [...prevUsers];
        updatedUsers[index] = {
          ...updatedUsers[index],
          status: previousStatus,
        };
        return updatedUsers;
      });
    }
  };

  const handleCancel = async (connectionId) => {
    const index = localUsers.findIndex((u) => u.connection_id === connectionId);
    if (index === -1) return;

    const previousStatus = localUsers[index].status;
    setLocalUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index] = { ...updatedUsers[index], status: null };
      return updatedUsers;
    });

    try {
      await connectionService.cancelInvite(connectionId);
      if (onRequestSent) {
        onRequestSent();
      }
    } catch (error) {
      console.log("Failed to cancel invite", error.message);
      setLocalUsers((prevUsers) => {
        const updatedUsers = [...prevUsers];
        updatedUsers[index] = {
          ...updatedUsers[index],
          status: previousStatus,
        };
        return updatedUsers;
      });
    }
  };

  // Pull-to-refresh: when the user pulls from top to bottom,
  // call the parent's onRequestSent function to refresh data.
  const handleRefresh = async () => {
    setRefreshing(true);
    if (onRequestSent) {
      await onRequestSent();
    }
    setRefreshing(false);
  };

  const filteredUsers = localUsers.filter((u) =>
    u.username.toLowerCase().includes(searchText.toLowerCase())
  );

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
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <SearchFilterBar
            searchText={searchText}
            onSearchChange={handleSearchChange}
            onFilterPress={onFilterPress}
            isDarkMode={isDarkMode}
          />

          {localUsers?.length <= 0 && (
            <View style={{ marginTop: "50%" }}>
              <NoItem title={"Users"} />
            </View>
          )}

          <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
            {filteredUsers.map((userItem) => {
              const buttonText =
                userItem.status === "pending" ? "Cancel" : "Connect";
              const buttonColor =
                userItem.status === "pending" ? Colors.disable : Colors.primary;

              return (
                <View key={userItem.id}>
                  <View
                    style={[
                      styles.userCard,
                      {
                        backgroundColor: isDarkMode
                          ? Colors.dark2
                          : Colors.lightGrey,
                      },
                    ]}
                  >
                    {!userItem?.profile_picture && (
                      <Image
                        source={profilePicPlaceholder}
                        style={styles.avatar}
                      />
                    )}
                    {userItem?.profile_picture && (
                      <Image
                        source={{ uri: userItem?.profile_picture }}
                        style={styles.avatar}
                      />
                    )}
                    <View style={styles.userInfo}>
                      <Text
                        style={[
                          styles.userName,
                          {
                            color: isDarkMode ? Colors.secondary : Colors.title,
                          },
                        ]}
                      >
                        {userItem?.username}
                      </Text>
                      <Text
                        style={[
                          styles.userType,
                          {
                            color: isDarkMode
                              ? Colors.disable
                              : Colors.textGrey,
                          },
                        ]}
                      >
                        {userItem?.profile_types?.length > 0
                          ? userItem.profile_types
                              .map((type) => {
                                const typeMap = {
                                  pet_owner: "Pet Owner",
                                  pet_breeder: "Pet Breeder",
                                  pet_shop: "Pet Shop",
                                };
                                return typeMap[type] || type;
                              })
                              .join(", ")
                          : "User Type Not Specified"}
                      </Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[
                        styles.connectButton,
                        { backgroundColor: buttonColor },
                      ]}
                      onPress={() => {
                        if (!userItem.status) {
                          handleConnect(userItem.id);
                        } else if (userItem.status === "pending") {
                          handleCancel(userItem.connection_id);
                        }
                      }}
                    >
                      <Text style={styles.connectButtonText}>{buttonText}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[style.divider, { marginVertical: 10 }]} />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "Avenir-Bold",
  },
  userType: {
    fontSize: 13,
    fontWeight: "400",
    fontFamily: "Avenir-SemiBold",
  },
  connectButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  connectButtonText: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Avenir-Bold",
  },
});
