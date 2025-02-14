import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../theme/color";
import style from "../theme/style";

const { width, height } = Dimensions.get("screen");

const Index = ({ navigation }) => {
  return (
    <>
      <ImageBackground
        source={require("../../assets/images/home/banner.png")}
        resizeMode="stretch"
        style={{ width, height: height / 3, paddingTop: 40 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          <View
            style={[
              style.txtinput,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: Colors.border,
                borderWidth: 1,
                backgroundColor: "#FFFFFF70",
                borderRadius: 10,
                flex: 1,
                paddingHorizontal: 10,
                height: 43,
              },
            ]}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <Icon name="search" color={Colors.secondary} size={20} />
            </TouchableOpacity>
            <TextInput
              placeholder="Search"
              selectionColor={Colors.primary}
              placeholderTextColor={Colors.secondary}
              style={{ color: Colors.secondary, flex: 1, marginHorizontal: 10 }}
            />
          </View>

          {/* Notification Icon */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Notification")}
            style={{ marginHorizontal: 10 }}
          >
            <Icon
              name="notifications-outline"
              color={Colors.secondary}
              size={30}
            />
          </TouchableOpacity>

          {/* Cart Icon */}
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <Icon name="cart-outline" color={Colors.secondary} size={30} />
          </TouchableOpacity>
        </View>

        {/* Banner Text */}
        <Text
          style={[
            style.s18,
            { color: Colors.secondary, marginTop: 50, marginLeft: 20 },
          ]}
        >
          SUMMER
        </Text>
        <View
          style={{
            width: width / 6,
            backgroundColor: Colors.secondary,
            height: 3,
            marginLeft: 20,
            marginTop: 5,
          }}
        />
        <Text
          style={[
            style.title,
            {
              color: Colors.secondary,
              marginTop: 15,
              marginLeft: 20,
              fontSize: 38,
            },
          ]}
        >
          30% OFF
        </Text>
      </ImageBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 20 }}
        contentContainerStyle={{
          height: Platform.OS === "ios" ? height * 1.25 : height * 1.15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 5,
            paddingHorizontal: 20,
          }}
        >
          <View
            style={[
              style.shadow,
              {
                justifyContent: "center",
                alignItems: "center",
                height: height / 10,
                flex: 1,
                borderRadius: 10,
              },
            ]}
          >
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/authentication/d2.png")}
                resizeMode="stretch"
                style={{ width: width / 12, height: height / 28 }}
              ></Image>
              <Text style={[style.s16, { color: Colors.disable }]}>Shop</Text>
            </TouchableOpacity>
          </View>
          <View style={{ margin: 10 }}></View>
          <View
            style={[
              style.shadow,
              { height: height / 10, flex: 1, borderRadius: 10 },
            ]}
          >
            <TouchableOpacity
              style={[
                {
                  justifyContent: "center",
                  alignItems: "center",
                  height: height / 10,
                  flex: 1,
                  borderRadius: 10,
                },
              ]}
            >
              <Image
                source={require("../../assets/images/authentication/d3.png")}
                resizeMode="stretch"
                style={{ width: width / 12, height: height / 28 }}
              ></Image>
              <Text style={[style.s16, { color: Colors.disable }]}>
                Service
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Index;
