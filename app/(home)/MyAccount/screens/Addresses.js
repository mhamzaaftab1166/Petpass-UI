import React, { useEffect, useState } from "react";
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
import { useTheme } from "../../../helper/themeProvider";
import useAddressStore from "../../../store/useAddressStore";
import useUserStore from "../../../store/useUserStore";
import Loader from "../../../components/Loader/Loader";
import addressService from "../../../services/addressService";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Address() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { user } = useUserStore();
  const { address, loading, fetchAddress, clearAddress } = useAddressStore();
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAddress(user?.id);
    return () => clearAddress();
  }, [user?.id]);

  const deleteAddress = async (rowKey) => {
    setIsLoading(true);
    try {
      await addressService.deleteUserAddress(user?.id, rowKey);
    } catch (error) {
      console.error("Error deleting address:", error);
    } finally {
      fetchAddress(user?.id);
      setIsLoading(false);
    }
  };

  if (loading) {
    return <Loader isLoad={loading} />;
  }

  return (
    <SafeAreaView
      style={[
        style.area,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >
      <Loader isLoad={isloading} />
      <View
        style={[
          style.main,
          { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
        ]}
      >
        <AppBar
          color={isDarkMode ? Colors.active : Colors.secondary}
          title="Address"
          titleStyle={[
            style.b18,
            { color: isDarkMode ? Colors.secondary : Colors.active },
          ]}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity onPress={() => router.back()}>
              <Icon
                name="chevron-back"
                color={isDarkMode ? Colors.secondary : Colors.active}
                size={30}
              />
            </TouchableOpacity>
          }
          trailing={
            <TouchableOpacity
              onPress={() =>
                router.push("/MyAccount/screens/AddressFrom")
              }
            >
              <Icon name="add" color={Colors.primary} size={30} />
            </TouchableOpacity>
          }
        />

        <SwipeListView
          data={address}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: isDarkMode ? Colors.active : Colors.lable,
                borderRadius: 10,
                marginTop: 20,
                backgroundColor: isDarkMode ? Colors.disable : Colors.secondary,
              }}
            >
              <Text
                style={[
                  style.b16,
                  { color: isDarkMode ? Colors.secondary : Colors.active },
                ]}
              >
                {item.full_name}
              </Text>
              <Text
                style={[
                  style.r14,
                  {
                    color: isDarkMode ? Colors.secondary : Colors.lable,
                    marginTop: 5,
                  },
                ]}
              >
                {item.address}
              </Text>
              <Text
                style={[
                  style.r14,
                  {
                    color: isDarkMode ? Colors.secondary : Colors.lable,
                    marginTop: 3,
                  },
                ]}
              >
                {item.phone_number}
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
                onPress={() =>
                  router.push(
                    `/MyAccount/screens/AddressFrom?userId=${user?.id}&addressId=${item.id}&isEdit=true`
                  )
                }
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
