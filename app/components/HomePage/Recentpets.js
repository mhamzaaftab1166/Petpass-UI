import React from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  View,
  Dimensions,
} from "react-native";
import { Avatar, Icon } from "react-native-paper";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import Title from "../Title/Title";

const RecentPets = () => {
  const { width, height } = Dimensions.get("screen");
  return (
    <>
      <Title title="Recent Pets" />
      <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <ImageBackground
              source={require("../../../assets/images/d4.png")}
              resizeMode="stretch"
              style={{ width: width / 1.4, height: height / 5.8 }}
            >
              <View
                style={{
                  alignItems: "flex-end",
                  marginRight: 10,
                  marginTop: 10,
                }}
              >
                <Avatar.Icon
                  icon={"heart-outline"}
                  color={Colors.active}
                  size={30}
                  style={{ backgroundColor: "#FFFFFF70" }}
                ></Avatar.Icon>
              </View>
              <View
                style={{
                  justifyContent: "flex-end",
                  flex: 1,
                  marginBottom: 10,
                  marginHorizontal: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text style={[style.b16, { color: Colors.secondary }]}>
                      Tommy Leo
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Icon name="star" color={"#FFCE00"} size={12}></Icon>
                      <Icon name="star" color={"#FFCE00"} size={12}></Icon>
                      <Icon name="star" color={"#FFCE00"} size={12}></Icon>
                      <Icon
                        name="star-outline"
                        color={Colors.secondary}
                        size={12}
                      ></Icon>
                      <Icon
                        name="star-outline"
                        color={Colors.secondary}
                        size={12}
                      ></Icon>
                      <Text style={[style.b10, { color: Colors.secondary }]}>
                        Cairn Terrier
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={[style.b16, { color: Colors.secondary }]}>
                        Dubai
                      </Text>
                      <Text style={[style.b10, { color: Colors.secondary }]}>
                        {" "}
                        Male
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>

            <View style={{ margin: 7 }}></View>

            <ImageBackground
              source={require("../../../assets/images/d4.png")}
              resizeMode="stretch"
              style={{ width: width / 1.4, height: height / 5.8 }}
            >
              <View
                style={{
                  alignItems: "flex-end",
                  marginRight: 10,
                  marginTop: 10,
                }}
              >
                <Avatar.Icon
                  icon={"heart-outline"}
                  color={Colors.active}
                  size={30}
                  style={{ backgroundColor: "#FFFFFF70" }}
                ></Avatar.Icon>
              </View>
              <View
                style={{
                  justifyContent: "flex-end",
                  flex: 1,
                  marginBottom: 10,
                  marginHorizontal: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text style={[style.b16, { color: Colors.secondary }]}>
                      Tommy Leo
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Icon name="star" color={"#FFCE00"} size={12}></Icon>
                      <Icon name="star" color={"#FFCE00"} size={12}></Icon>
                      <Icon name="star" color={"#FFCE00"} size={12}></Icon>
                      <Icon
                        name="star-outline"
                        color={Colors.secondary}
                        size={12}
                      ></Icon>
                      <Icon
                        name="star-outline"
                        color={Colors.secondary}
                        size={12}
                      ></Icon>
                      <Text style={[style.b10, { color: Colors.secondary }]}>
                        Cairn Terrier
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={[style.b16, { color: Colors.secondary }]}>
                        Ajman
                      </Text>
                      <Text style={[style.b10, { color: Colors.secondary }]}>
                        Male
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default RecentPets;
