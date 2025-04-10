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
import ProfilePlaceholer from "../../../../assets/images/profilePlaceHolder.png";

const dummyUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    type: "Designer",
    profilePic: ProfilePlaceholer,
  },
  {
    id: 2,
    name: "Sophie Miller",
    type: "Photographer",
    profilePic: ProfilePlaceholer,
  },
  {
    id: 3,
    name: "Daniel Smith",
    type: "Developer",
    profilePic: ProfilePlaceholer,
  },
  {
    id: 6,
    name: "Alex Johnson",
    type: "Designer",
    profilePic: ProfilePlaceholer,
  },
];

export default function AddConnections({ onFilterPress }) {
  const { isDarkMode } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [connections, setConnections] = useState({});

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const handleConnect = (id) => {
    setConnections((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const filteredUsers = dummyUsers.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
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

          <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
            {filteredUsers.map((user, index) => (
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
                  <Image source={user.profilePic} style={styles.avatar} />
                  <View style={styles.userInfo}>
                    <Text
                      style={[
                        styles.userName,
                        {
                          color: isDarkMode ? Colors.secondary : Colors.title,
                        },
                      ]}
                    >
                      {user.name}
                    </Text>
                    <Text
                      style={[
                        styles.userType,
                        {
                          color: isDarkMode ? Colors.disable : Colors.textGrey,
                        },
                      ]}
                    >
                      {user.type}
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.connectButton,
                      {
                        backgroundColor: connections[user.id]
                          ? Colors.disable
                          : Colors.primary,
                      },
                    ]}
                    onPress={() => handleConnect(user.id)}
                    disabled={connections[user.id]}
                  >
                    <Text style={styles.connectButtonText}>
                      {connections[user.id] ? "Sent" : "Connect"}
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
    elevation: 4,
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
