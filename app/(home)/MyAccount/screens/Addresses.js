import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
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
import NoItem from "../../../components/NoItem/NoItem";
import AppAlert from "../../../components/AppAlert/index";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Address() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { user } = useUserStore();
  const { address, loading, fetchAddress, clearAddress } = useAddressStore();
  const [isloading, setIsLoading] = useState(false);

  // New state for delete confirmation alert
  const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    fetchAddress(user?.id);
    return () => clearAddress();
  }, [user?.id]);

  const deleteAddress = async (addressId) => {
    setIsLoading(true);
    try {
      setDeleteAlertVisible(false);
      await addressService.deleteUserAddress(user?.id, addressId);
    } catch (error) {
      console.error("Error deleting address:", error);
    } finally {
      fetchAddress(user?.id);
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = (addressId) => {
    setSelectedAddressId(addressId);
    setDeleteAlertVisible(true);
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
              onPress={() => router.push("/MyAccount/screens/AddressFrom")}
            >
              <Icon name="add" color={Colors.primary} size={30} />
            </TouchableOpacity>
          }
        />
        {address.length === 0 ? (
          <NoItem title={"address"} />
        ) : (
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
                  backgroundColor: isDarkMode ? Colors.lable : Colors.secondary,
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
                  {item.country_code} {item.phone_number}
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
                  <Icons
                    name="pencil-outline"
                    color={Colors.primary}
                    size={30}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleConfirmDelete(item.id)}
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
        )}
      </View>

      {/* Confirmation Alert */}
      <AppAlert
        showAlert={deleteAlertVisible}
        showProgress={false}
        title="Confirm Delete"
        message="Are you sure you want to delete this address?"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No"
        confirmText="Yes"
        confirmButtonColor={Colors.primary}
        onCancelPressed={() => setDeleteAlertVisible(false)}
        onConfirmPressed={() => {
          deleteAddress(selectedAddressId);
          setDeleteAlertVisible(false);
        }}
      />
    </SafeAreaView>
  );
}
