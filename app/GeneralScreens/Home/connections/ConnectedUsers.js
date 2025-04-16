import React, { useState, useEffect } from "react";
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
import NoItem from "../../../components/NoItem/NoItem";
import connectionService from "../../../services/connectionService";

export default function Connected({ connects, onUpdate }) {
  const { isDarkMode } = useTheme();
  const [localConnects, setLocalConnects] = useState(connects);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMenuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    setLocalConnects(connects);
  }, [connects]);

  const handleRemoveConnect = async (user) => {
    console.log(user);
    
    const prevConnects = [...localConnects];
    const updatedConnects = localConnects.filter((u) => u.id !== user.id);
    setLocalConnects(updatedConnects);
    setMenuVisible(false);

    try {
      await connectionService.removeConnect(user?.connection_id);
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.log("Error removing connection:", error.message);
      setLocalConnects(prevConnects);
    }
  };

  const handleDetailPress = (id) => {
    console.log(`Detail pressed for user with id: ${id}`);
  };

  const openMenu = (user) => {
    setSelectedUser(user);
    setMenuVisible(true);
  };

  return (
    <SafeAreaView
      style={[
        style.area,
        {
          flex: 1,
          backgroundColor: isDarkMode ? Colors.active : Colors.secondary,
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {localConnects?.length <= 0 && (
            <View style={{ marginTop: "50%" }}>
              <NoItem title={"Connects"} />
            </View>
          )}
          <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
            {localConnects.map((user) => (
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
                  {!user?.profile_picture && (
                    <Image source={ProfilePlaceholer} style={styles.avatar} />
                  )}
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
                      {user.username}
                    </Text>
                    <Text
                      style={[
                        styles.userType,
                        {
                          color: isDarkMode ? Colors.disable : Colors.textGrey,
                        },
                      ]}
                    >
                      {user?.profile_types?.length > 0
                        ? user.profile_types
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

                  <View style={styles.rightIcons}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => openMenu(user)}
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

        <Modal
          visible={isMenuVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setMenuVisible(false)}
        >
          <Pressable
            style={[styles.overlay]}
            onPress={() => setMenuVisible(false)}
          >
            <View
              style={[
                styles.bottomSheet,
                {
                  backgroundColor: isDarkMode ? Colors.light : Colors.secondary,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleRemoveConnect(selectedUser)}
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
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: "12%",
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.primary,
    fontFamily: "Avenir-Bold",
  },
});
