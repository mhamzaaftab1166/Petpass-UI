import {
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { AppBar } from "@react-native-material/core";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import { useRouter } from "expo-router";
import { useTheme } from "../../helper/themeProvider";
import Icon from "react-native-vector-icons/Ionicons";
import PetListingItem from "../../components/PetListingItem/PetListingItem";
import { SwipeListView } from "react-native-swipe-list-view";
import { usePetStore } from "../../store/useStore";
import Loader from "../../components/Loader/Loader";
import petServices from "../../services/petServices";
import AppErrorMessage from "../../components/forms/AppErrorMessage";
import AppAlert from "../../components/AppAlert/index";
import NoItem from "../../components/NoItem/NoItem";
import { useFocusEffect } from "expo-router";
import PetListingSkeletonCard from "../../components/SkeletonCards/PetListingCards";

const { width, height } = Dimensions.get("screen");

export default function MyPets({ isDelete = true }) {
  const { pets, loading, petError, petErrorVisible, fetchPets, clearPets } =
    usePetStore();
  const [isloading, setIsLoading] = useState(false);
  const [delError, setDelError] = useState();
  const [delErrorVisible, setDelErrorVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const router = useRouter();
  const { isDarkMode } = useTheme();

  useFocusEffect(
    useCallback(() => {
      fetchPets();
      return () => clearPets();
    }, [])
  );

  const handleDeletePet = async (id) => {
    setShowAlert(false);
    setIsLoading(true);
    try {
      setShowAlert(false);
      await petServices.deletePets(id);
    } catch (error) {
      console.error("Error deleting pet:", error);
      setDelError(error.message);
      setDelErrorVisible(true);
    } finally {
      await fetchPets();
      setIsLoading(false);
      setShowAlert(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedPetId(id);
    setShowAlert(true);
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.rowFront,
        { backgroundColor: isDarkMode ? Colors.dark : Colors.white },
      ]}
    >
      <PetListingItem pet={item} home={true} />
    </View>
  );

  const renderHiddenItem = ({ item }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmDelete(item?.id)}
      >
        <Icon name="trash" color="#FA6262" size={30} />
      </TouchableOpacity>
    </View>
  );

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
          {
            backgroundColor: isDarkMode ? Colors.active : Colors.secondary,
            marginTop: 10,
          },
        ]}
      >
        <AppBar
          color={isDarkMode ? Colors.active : Colors.secondary}
          title="Your Pet List"
          titleStyle={[
            style.b18,
            {
              color: isDarkMode ? Colors.secondary : Colors.active,
              fontFamily: "Avenir-Bold",
            },
          ]}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity onPress={() => router.back()}>
              <Icon
                name="chevron-back"
                color={isDarkMode ? Colors.secondary : Colors.active}
                size={25}
              />
            </TouchableOpacity>
          }
        />
        <Text
          style={[
            styles.text,
            {
              color: Colors.primary,
              marginTop: 20,
              marginBottom: 38,
            },
          ]}
        >
          Manage Your Pets Here
        </Text>
        <AppErrorMessage
          error={petError || delError}
          visible={petErrorVisible || delErrorVisible}
        />
        {loading ? (
          <>
            {[...Array(3)].map((_, index) => (
              <PetListingSkeletonCard key={index} />
            ))}
          </>
        ) : pets?.length > 0 ? (
          <SwipeListView
            data={pets}
            renderItem={renderItem}
            renderHiddenItem={isDelete ? renderHiddenItem : null}
            rightOpenValue={-75}
            disableRightSwipe
          />
        ) : (
          <NoItem title={"Pet List"} />
        )}
      </View>
      <AppAlert
        showAlert={showAlert}
        title="Are you sure?"
        message="Do you really want to delete this pet?"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No"
        confirmText="Yes"
        confirmButtonColor="red"
        onCancelPressed={() => setShowAlert(false)}
        onConfirmPressed={() => handleDeletePet(selectedPetId)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: "Avenir-Bold",
    textAlign: "center",
  },
  rowFront: {
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
    zIndex: 2,
    elevation: 2,
  },
  rowBack: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 10,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  deleteButton: {},
});
