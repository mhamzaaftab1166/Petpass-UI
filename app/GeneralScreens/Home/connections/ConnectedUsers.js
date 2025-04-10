import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import style from "../../../theme/style";
import { Colors } from "../../../theme/color";
import { useTheme } from "../../../helper/themeProvider";
import ProfilePlaceholer from "../../../../assets/images/profilePlaceHolder.png";
import Detail from "../../../../assets/images/pets/detailcon.png";
import { Entypo } from "@expo/vector-icons"; // for 3-dot icon

const initialUsers = [
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

export default function Connected({ onFilterPress }) {
  const { isDarkMode } = useTheme();
  const [users, setUsers] = useState(initialUsers);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const handleRemoveConnect = (id) => {
    console.log(`Removed connection for user with id: ${id}`);
    setMenuVisible(false);
  };

  const handleDetailPress = (id) => {
    console.log(`Detail pressed for user with id: ${id}`);
  };

  const openMenu = (id) => {
    setSelectedUserId(id);
    setMenuVisible(true);
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
            {users.map((user) => (
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

                  {/* Right side icons container */}
                  <View style={styles.rightIcons}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => openMenu(user.id)}
                    >
                      <Entypo
                        name="dots-three-horizontal"
                        size={20}
                        color={Colors.primary}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ marginLeft: 12 }}
                      activeOpacity={0.8}
                      onPress={() => handleDetailPress(user.id)}
                    >
                      <Image source={Detail} style={styles.detailImage} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={[style.divider, { marginVertical: 10 }]} />
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Sheet Modal */}
        <Modal
          visible={isMenuVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setMenuVisible(false)}
        >
          <Pressable
            style={styles.overlay}
            onPress={() => setMenuVisible(false)}
          >
            <View style={styles.bottomSheet}>
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleRemoveConnect(selectedUserId)}
              >
                <Text style={styles.optionText}>Remove Connect</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingRight: 16,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    position: "relative",
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
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height:"12%"
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.primary,
  },
});
