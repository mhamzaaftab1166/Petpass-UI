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
import ProfilePlaceholer from "../../../../assets/images/profilePlaceHolder.png";
import NoItem from "../../../components/NoItem/NoItem";

const dummyRequests = [];

export default function AddConnections({ requests }) {
  const { isDarkMode } = useTheme();

  const handleRequestResponse = (id, response) => {
    console.log(`${response} request from user with id: ${id}`);
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
          {requests?.length <= 0 && (
            <View
              style={{
                marginTop: "50%",
              }}
            >
              <NoItem title={"Users"} />
            </View>
          )}
          <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
            {requests.map((request) => (
              <View key={request.id}>
                <View
                  style={[
                    styles.requestCard,
                    {
                      backgroundColor: isDarkMode
                        ? Colors.dark2
                        : Colors.lightGrey,
                    },
                  ]}
                >
                  {!request?.profile_picture && (
                    <Image source={ProfilePlaceholer} style={styles.avatar} />
                  )}
                  {request?.profile_picture && (
                    <Image
                      source={{ uri: request?.profile_picture }}
                      style={styles.avatar}
                    />
                  )}
                  <View style={styles.userInfo}>
                    <View style={styles.nameRoleContainer}>
                      <Text
                        style={[
                          styles.userName,
                          {
                            color: isDarkMode ? Colors.secondary : Colors.title,
                          },
                        ]}
                      >
                        {request?.username}
                      </Text>
                      <Text
                        style={[
                          styles.userRole,
                          {
                            color: isDarkMode
                              ? Colors.disable
                              : Colors.textGrey,
                          },
                        ]}
                      >
                        {request?.profile_types?.length > 0
                          ? (() => {
                              const typeMap = {
                                pet_owner: "Pet Owner",
                                pet_breeder: "Pet Breeder",
                                pet_shop: "Pet Shop",
                              };
                              const displayText = request.profile_types
                                .map((type) => typeMap[type] || type)
                                .join(", ");
                              return displayText.length > 10
                                ? displayText.slice(0, 20) + "..."
                                : displayText;
                            })()
                          : "Not Specified"}
                      </Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={[
                          styles.acceptButton,
                          {
                            backgroundColor: Colors.primary,
                          },
                        ]}
                        onPress={() =>
                          handleRequestResponse(request.id, "Accepted")
                        }
                      >
                        <Text style={styles.buttonText}>Accept</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={[
                          styles.rejectButton,
                          {
                            backgroundColor: Colors.disable,
                          },
                        ]}
                        onPress={() =>
                          handleRequestResponse(request.id, "Rejected")
                        }
                      >
                        <Text style={styles.buttonText}>Reject</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
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
  requestCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    marginBottom: 16,
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
  nameRoleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "Avenir-Bold",
    paddingLeft: 8,
  },
  userRole: {
    fontSize: 13,
    fontWeight: "400",
    fontFamily: "Avenir-SemiBold",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  acceptButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
  },
  rejectButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flex: 1,
  },
  buttonText: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Avenir-Bold",
    textAlign: "center",
  },
});
