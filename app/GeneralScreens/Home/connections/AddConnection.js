import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
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


export default function AddConnections({ onFilterPress,users=[] }) {
  const { isDarkMode } = useTheme();
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const handleConnect = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isConnected: !user.isConnected } : user
      )
    );
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchText.toLowerCase())
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <SearchFilterBar
            searchText={searchText}
            onSearchChange={handleSearchChange}
            onFilterPress={onFilterPress}
            isDarkMode={isDarkMode}
          />

          {users?.length <= 0 && (
            <View
              style={{
                marginTop: "50%",
              }}
            >
              <NoItem title={"Users"} />
            </View>
          )}

          <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
            {filteredUsers.map((user) => (
              <View key={user.id}>
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
                  {!user?.profile_picture&&<Image source={profilePicPlaceholder} style={styles.avatar} />}
                  {user?.profile_picture && (
                    <Image
                      source={{ uri: user?.profile_picture }}
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
                      {user?.username}
                    </Text>
                    <Text
                      style={[
                        styles.userType,
                        {
                          color: isDarkMode ? Colors.disable : Colors.textGrey,
                        },
                      ]}
                    >
                      {"Pet Owner"}
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.connectButton,
                      {
                        backgroundColor: user.isConnected
                          ? Colors.disable
                          : Colors.primary,
                      },
                    ]}
                    onPress={() => handleConnect(user.id)}
                    disabled={user.isConnected}
                  >
                    <Text style={styles.connectButtonText}>
                      {user.isConnected ? "Sent" : "Connect"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={[style.divider, { marginVertical: 10 }]} />
              </View>
            ))}
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
