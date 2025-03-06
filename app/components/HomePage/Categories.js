import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { Colors } from "../../theme/color";
import style from "../../theme/style";

const { width, height } = Dimensions.get("screen");

const Categories = () => {
  return (
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
        <CategoryItem
          imageSource={require("../../../assets/images/home/hotel.png")}
          title="Hotels"
          categoryPayload={{
            filterValue: "pet_friendly_hotels",
          }}
        />
        <View style={{ margin: 10 }}></View>
        <CategoryItem
          imageSource={require("../../../assets/images/home/grooming.png")}
          title="Grooming"
          categoryPayload={{
            filterValue: "pet_grooming",
          }}
        />
        <View style={{ margin: 10 }}></View>
        <CategoryItem
          imageSource={require("../../../assets/images/home/training.png")}
          title="Training"
          categoryPayload={{
            filterValue: "pet_training",
          }}
        />
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
            source={require("../../../assets/images/authentication/d3.png")}
            resizeMode="stretch"
            style={{ width: width / 12, height: height / 28 }}
          ></Image>
          <Text style={[style.s16, { color: Colors.disable }]}>Service</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({});
