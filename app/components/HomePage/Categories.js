import React from "react";
import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import { useRouter } from "expo-router"; // ✅ Import useRouter
import { Colors } from "../../theme/color";
import style from "../../theme/style";

const { width, height } = Dimensions.get("screen");

const CategoryItem = ({ imageSource, title, categoryPayload }) => {
  const router = useRouter();

  return (
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
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() =>
          router.push({
            pathname: "/Map",
            params: {
              filter: JSON.stringify(categoryPayload),
            },
          })
        }
      >
        <Image
          source={imageSource}
          resizeMode="stretch"
          style={{ width: width / 12, height: height / 28 }}
        />
        <Text style={[style.s16, { color: Colors.disable, marginTop: 5 }]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Categories = () => {
  return (
    <View style={{ paddingVertical: 5, paddingHorizontal: 20 }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <CategoryItem
          imageSource={require("../../../assets/images/home/hotel.png")}
          title="Hotels"
          categoryPayload={{
            filterValue: "restaurant",
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

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
      >
        <CategoryItem
          imageSource={require("../../../assets/images/home/walking.png")}
          title="Walking"
          categoryPayload={{
            filterValue: "pet_walking",
          }}
        />
        <View style={{ margin: 10 }}></View>
        <CategoryItem
          imageSource={require("../../../assets/images/home/vet.png")}
          title="Veterinary"
          categoryPayload={{
            filterValue: "veterinary_care",
          }}
        />
        <View style={{ margin: 10 }}></View>
        <CategoryItem
          imageSource={require("../../../assets/images/home/more.png")}
          title="More"
        />
      </View>
    </View>
  );
};

export default Categories;
