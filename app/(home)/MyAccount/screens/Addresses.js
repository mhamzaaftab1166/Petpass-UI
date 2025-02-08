import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../../theme/color";
import style from "../../../theme/style";
import { useRouter } from "expo-router";
import { SwipeListView } from "react-native-swipe-list-view";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Address() {
  const router = useRouter();

  // Sample Address Data
  const [addresses, setAddresses] = useState([
    {
      id: "1",
      name: "Anita Rose",
      address: "1B -123 Latona Ave NE, Washington, United States",
      phone: "(+1) 392 385 378",
    },
    {
      id: "2",
      name: "John Doe",
      address: "456B - Elm Street, New York, United States",
      phone: "(+1) 123 456 789",
    },
    {
      id: "3",
      name: "Alice Smith",
      address: "789C - Sunset Blvd, Los Angeles, United States",
      phone: "(+1) 987 654 321",
    },
  ]);

  // Delete Address Function
  const deleteAddress = (rowKey) => {
    const newData = addresses.filter((item) => item.id !== rowKey);
    setAddresses(newData);
  };

  return (
    <SafeAreaView style={[style.area, { backgroundColor: Colors.secondary }]}>
      <View style={[style.main, { backgroundColor: Colors.secondary }]}>
        <AppBar
          color={Colors.secondary}
          title="Address"
          titleStyle={[style.b18, { color: Colors.active }]}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity onPress={() => router.push("/my-tabs")}>
              <Icon name="chevron-back" color={Colors.active} size={30} />
            </TouchableOpacity>
          }
          trailing={
            <TouchableOpacity onPress={() => router.push("/new-address")}>
              <Icon name="add" color={Colors.primary} size={30} />
            </TouchableOpacity>
          }
        />

        <SwipeListView
          data={addresses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: Colors.lable,
                borderRadius: 10,
                marginTop: 20,
                backgroundColor: Colors.secondary,
              }}
            >
              <Text style={[style.b16, { color: Colors.active }]}>
                {item.name}
              </Text>
              <Text style={[style.r14, { color: Colors.lable, marginTop: 5 }]}>
                {item.address}
              </Text>
              <Text style={[style.r14, { color: Colors.lable, marginTop: 3 }]}>
                {item.phone}
              </Text>
            </View>
          )}
          renderHiddenItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                height: 80, 
                backgroundColor: Colors.secondary,
                paddingHorizontal: 10,
                marginTop: 20,
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => router.push("/edit-address")}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Icons name="pencil-outline" color={Colors.primary} size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteAddress(item.id)}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 50,
                  height: "100%",
                }}
              >
                <Icon name="trash" color="#FA6262" size={30} />
              </TouchableOpacity>
            </View>
          )}
          rightOpenValue={-100}
        />
      </View>
    </SafeAreaView>
  );
}
