import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Platform,
} from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import * as Location from "expo-location";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { BottomSheet } from "@rneui/themed";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import moment from "moment";
import { useLocalSearchParams } from "expo-router";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Loader from "../components/Loader/Loader";
import { Colors } from "../theme/color";
import style from "../theme/style";
import { useTheme } from "../helper/themeProvider";

const API_KEY = "AIzaSyCFt2E-FGr2Xk7N9t_sgyuyxmAcfpF5-0U";
const radius = 5000; // 5km

const petOptions = [
  {
    id: 0,
    name: "Show All",
    type: "pet_store|veterinary_care|pet_grooming|pet_food_store|pet_walking_area|pet_friendly_restaurant|pet_friendly_hotels",
  },
  { id: 1, name: "Pet Food Stores", type: "pet_food_store" },
  { id: 2, name: "Grooming Center", type: "pet_grooming" },
  { id: 3, name: "Veterinary Care", type: "veterinary_care" },
  { id: 4, name: "Pet Store", type: "pet_store" },
  { id: 5, name: "Pet-Friendly Restaurants", type: "pet_friendly_restaurant" },
  { id: 6, name: "Pet-Walking", type: "pet_walking_area" },
  { id: 7, name: "Pet-Friendly Hotels", type: "pet_friendly_hotels" },
];

const Map = () => {
  const { isDarkMode } = useTheme();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = useRef(null);
  const [showHours, setShowHours] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [isPetOptionsVisible, setIsPetOptionsVisible] = useState(false);
  const [todayStatus, setTodayStatus] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const params = useLocalSearchParams();
  const filter = params.filter ? JSON.parse(params.filter) : {};
  const filterValue = filter.filterValue;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        return;
      }

      try {
        const currentLocation = await Location.getCurrentPositionAsync({});

        const zoomedLocation = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        };

        setLocation(zoomedLocation);
        setLoading(false);

        if (mapRef.current) {
          mapRef.current.animateToRegion(zoomedLocation, 1000);
        }

        // if param is available use that for initial search
        // else search all from petOptions list
        const placeTypes = filterValue ? filterValue : petOptions[0].type;

        fetchPetPlaces(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude,
          placeTypes
        );
      } catch (error) {
        console.error("Error fetching location:", error);
        setLoading(false);
      }
    })();
  }, [params.filter]);

  const fetchPetPlaces = async (lat, lng, type) => {
    setLoading(true);
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&keyword=pet&key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results) {
        setPlaces([]);
        setPlaces(data.results);
      }
    } catch (error) {
      console.error("Error fetching pet places:", error);
    }
    setLoading(false);
  };

  const fetchPlaceDetails = async (placeId) => {
    setLoading(true);
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_phone_number,opening_hours,photos,formatted_address&key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.result) {
        setSelectedPlace(data.result);
        setIsVisible(true);

        const todayIndex = new Date().getDay();
        const periods = data.result.opening_hours?.periods || [];

        let statusMessage = "🔴 Closed";
        const todayPeriod = periods.find((p) => p.open?.day === todayIndex);

        const isOpen24_7 = periods.some(
          (p) => p.open?.time === "0000" && !p.close
        );

        if (isOpen24_7) {
          statusMessage = "🟢 Open 24/7";
        } else if (todayPeriod) {
          const openTime = moment(todayPeriod.open.time, "HHmm").format(
            "h:mm A"
          );
          const closeTime = todayPeriod.close
            ? moment(todayPeriod.close.time, "HHmm").format("h:mm A")
            : "Unknown";

          const now = moment().format("HH:mm");
          const formattedOpenTime = moment(
            todayPeriod.open.time,
            "HHmm"
          ).format("HH:mm");
          const formattedCloseTime = todayPeriod.close
            ? moment(todayPeriod.close.time, "HHmm").format("HH:mm")
            : "23:59";

          if (now >= formattedOpenTime && now <= formattedCloseTime) {
            statusMessage = `🟢 Open Now (Closes at ${closeTime})`;
          } else {
            statusMessage = `🔴 Closed (Opens at ${openTime})`;
          }
        }

        setTodayStatus(statusMessage);
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
    setLoading(false);
  };

  const recenterMap = () => {
    if (mapRef.current && location) {
      mapRef.current.animateToRegion(location, 1000);
    }
  };

  const handleSearchResult = (data, details = null) => {
    setLoading(true);
    setSearchResult({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      name: details.name,
      address: details.formatted_address,
    });
    setIsSearchModalVisible(false);
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        1000
      );
    }

    setPlaces([]);

    fetchPetPlaces(
      details.geometry.location.lat,
      details.geometry.location.lng,
      selectedOptions.length > 0
        ? selectedOptions.join("|")
        : filterValue || petOptions[0].type
    );
    setLoading(false);
  };

  const clearMarkers = () => {
    setPlaces([]);
    setSearchResult(null);
    setSelectedOptions([]);
  };

  const handleConfirmSelection = () => {
    setLoading(true);
    setIsPetOptionsVisible(false);
    if (selectedOptions.length > 0) {
      if (searchResult !== null) {
        fetchPetPlaces(
          searchResult.latitude,
          searchResult.longitude,
          selectedOptions.join("|")
        );
      } else {
        fetchPetPlaces(
          location.latitude,
          location.longitude,
          selectedOptions.join("|")
        );
      }
    }
    setLoading(false);
  };

  const handleToggleSelect = (option) => {
    setSelectedOptions((prev) => {
      if (option.id === 0) {
        return prev.includes(option.type) ? [] : [option.type];
      }

      if (prev.includes(petOptions[0].type)) {
        return [option.type];
      }

      const updatedSelection = prev.includes(option.type)
        ? prev.filter((item) => item !== option.type)
        : [...prev, option.type];

      const allOptionsSelected = petOptions
        .slice(1) // Exclude "Show All"
        .every((opt) => updatedSelection.includes(opt.type));

      return allOptionsSelected ? [petOptions[0].type] : updatedSelection;
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader isLoad={loading} />
      ) : location ? (
        <>
          <MapView
            style={styles.map}
            provider={PROVIDER_DEFAULT}
            ref={mapRef}
            region={location}
            showsUserLocation
            showsMyLocationButton={false}
          >
            {places.map((place, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: place.geometry.location.lat,
                  longitude: place.geometry.location.lng,
                }}
                title={place.name}
                onPress={() => fetchPlaceDetails(place.place_id)}
              />
            ))}
            {searchResult && (
              <Marker
                coordinate={{
                  latitude: searchResult.latitude,
                  longitude: searchResult.longitude,
                }}
                title={searchResult.name}
              />
            )}
          </MapView>

          {/* Top Icon Buttons */}
          <View style={styles.iconRow}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setIsPetOptionsVisible(true)}
            >
              <Image
                source={require("../../assets/images/map/filterIcon.png")}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={recenterMap}>
              <Image
                source={require("../../assets/images/map/zoom.png")}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setIsSearchModalVisible(true)}
            >
              <Image
                source={require("../../assets/images/map/search.png")}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={clearMarkers}>
              <Image
                source={require("../../assets/images/map/close.png")}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          </View>

          <Modal
            visible={isPetOptionsVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIsPetOptionsVisible(false)}
          >
            <View style={[styles.dropdownModalContainer]}>
              <View
                style={[
                  styles.dropdownContent,
                  {
                    backgroundColor: isDarkMode
                      ? Colors.active
                      : Colors.secondary,
                  },
                ]}
              >
                <View style={styles.modalHeader}>
                  {/* Back Arrow */}
                  <TouchableOpacity
                    onPress={() => setIsPetOptionsVisible(false)}
                  >
                    <MaterialIcons
                      style={[
                        {
                          color: isDarkMode ? Colors.secondary : Colors.active,
                          fontFamily: "Avenir-Regular",
                        },
                      ]}
                      name="arrow-back"
                      size={30}
                      color="#000"
                    />
                  </TouchableOpacity>

                  {/* OK Checkmark */}
                  <TouchableOpacity onPress={handleConfirmSelection}>
                    <Text
                      style={[
                        style.s16,
                        {
                          color: isDarkMode ? Colors.secondary : Colors.active,
                          fontFamily: "Avenir-Regular",
                          paddingTop: 10,
                        },
                      ]}
                    >
                      Search
                    </Text>
                  </TouchableOpacity>
                </View>

                {petOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.dropdownItem,
                      selectedOptions.includes(option.type) &&
                        styles.selectedItem,
                    ]}
                    onPress={() => handleToggleSelect(option)}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      {selectedOptions.includes(option.type) && (
                        <FontAwesome
                          name="check"
                          size={16}
                          color="white"
                          style={{ marginRight: 8 }}
                        />
                      )}
                      <Text
                        style={[
                          styles.dropdownItemText,
                          {
                            color: isDarkMode
                              ? Colors.secondary
                              : Colors.active,
                          },
                          selectedOptions.includes(option.type)
                            ? { color: "white" }
                            : {},
                        ]}
                      >
                        {option.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>

          {/* BottomSheet for place details */}
          <BottomSheet modalProps={{}} isVisible={isVisible}>
            <View style={[styles.modalContainer]}>
              <View
                style={[
                  styles.modalContent,
                  {
                    backgroundColor: isDarkMode
                      ? Colors.active
                      : Colors.secondary,
                  },
                ]}
              >
                {selectedPlace ? (
                  <>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => {
                        setIsVisible(false);
                        setShowHours(false);
                        setSelectedPlace(null);
                      }}
                    >
                      <Text
                        style={
                          (styles.closeText,
                          {
                            color: isDarkMode
                              ? Colors.secondary
                              : Colors.active,
                          })
                        }
                      >
                        ✕
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.placeName,
                        {
                          color: isDarkMode ? Colors.secondary : Colors.active,
                          fontFamily: "Avenir-Bold",
                        },
                      ]}
                    >
                      {selectedPlace.name}
                    </Text>
                    {selectedPlace.formatted_address && (
                      <Text
                        style={[
                          styles.placeDetails,
                          {
                            color: isDarkMode
                              ? Colors.secondary
                              : Colors.active,
                            fontFamily: "Avenir-Regular",
                          },
                        ]}
                      >
                        📍 {selectedPlace.formatted_address}
                      </Text>
                    )}
                    <TouchableOpacity style={styles.actionButton}>
                      <Text
                        style={[
                          styles.buttonText,
                          {
                            color: Colors.secondary,

                            fontFamily: "Avenir-Bold",
                          },
                        ]}
                      >
                        Instructions
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.placeDetails,
                        {
                          color: isDarkMode ? Colors.secondary : Colors.active,
                          fontFamily: "Avenir-Regular",
                        },
                      ]}
                    >
                      ⭐{" "}
                      {selectedPlace.rating
                        ? selectedPlace.rating + " Rating"
                        : "No rating"}
                    </Text>
                    {selectedPlace.formatted_phone_number && (
                      <Text
                        style={[
                          styles.placeDetails,
                          {
                            color: isDarkMode
                              ? Colors.secondary
                              : Colors.active,
                            fontFamily: "Avenir-Regular",
                          },
                        ]}
                      >
                        📞 {selectedPlace.formatted_phone_number}
                      </Text>
                    )}
                    {selectedPlace.opening_hours && (
                      <View>
                        <TouchableOpacity
                          onPress={() => setShowHours(!showHours)}
                        >
                          <Text
                            style={[
                              styles.placeDetails,
                              {
                                color: isDarkMode
                                  ? Colors.secondary
                                  : Colors.active,
                                fontFamily: "Avenir-Regular",
                              },
                            ]}
                          >
                            {todayStatus} ▼
                          </Text>
                        </TouchableOpacity>
                        {showHours &&
                          selectedPlace.opening_hours.weekday_text && (
                            <View
                              style={[
                                styles.openingHoursContainer,
                                {
                                  backgroundColor: isDarkMode
                                    ? Colors.active
                                    : Colors.secondary,
                                },
                              ]}
                            >
                              {selectedPlace.opening_hours.weekday_text.map(
                                (day, index) => (
                                  <Text
                                    key={index}
                                    style={[
                                      styles.placeDetails,
                                      {
                                        color: isDarkMode
                                          ? Colors.secondary
                                          : Colors.active,
                                        fontFamily: "Avenir-Regular",
                                      },
                                    ]}
                                  >
                                    {day}
                                  </Text>
                                )
                              )}
                            </View>
                          )}
                      </View>
                    )}
                    {selectedPlace.photos &&
                      selectedPlace.photos.length > 0 && (
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                        >
                          {selectedPlace.photos.map((photo, index) => (
                            <Image
                              key={index}
                              source={{
                                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${API_KEY}`,
                              }}
                              style={[styles.placeImage, { marginRight: 10 }]}
                            />
                          ))}
                        </ScrollView>
                      )}
                  </>
                ) : (
                  <Text style={styles.loadingText}>
                    Select a place to see details
                  </Text>
                )}
              </View>
            </View>
          </BottomSheet>

          {/* Modal for custom search - autofill */}
          <Modal
            visible={isSearchModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsSearchModalVisible(false)}
          >
            <View style={styles.searchModalContainer}>
              <View
                style={[
                  styles.searchModalContent,
                  {
                    backgroundColor: isDarkMode
                      ? Colors.active
                      : Colors.secondary,
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setIsSearchModalVisible(false)}
                >
                  <Text
                    style={[
                      styles.closeText,
                      { color: isDarkMode ? Colors.secondary : Colors.active },
                    ]}
                  >
                    ✕
                  </Text>
                </TouchableOpacity>
                <GooglePlacesAutocomplete
                  nearbyPlacesAPI="GooglePlacesSearch"
                  placeholder="Search for a place..."
                  listViewDisplayed="auto"
                  debounce={500}
                  minLength={2}
                  enablePoweredByContainer={false}
                  fetchDetails={true}
                  autoFocus={true}
                  styles={autoComplete}
                  query={{
                    key: API_KEY,
                    language: "en",
                    // type is the palce type - not search type
                    // type: "animal"
                  }}
                  onFail={(fail) => console.log("Auto fill failed: " + fail)}
                  onError={(error) => console.log("Autocomplete Error:", error)}
                  onPress={(data, details = null) => {
                    handleSearchResult(data, details);
                  }}
                />
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <View style={styles.noLocationContainer}>
          <Image
            source={require("../../assets/images/home/banner1.png")}
            style={styles.image}
          />
          <Text
            style={[
              styles.text,
              {
                backgrouncolor: isDarkMode ? Colors.secondary : Colors.active,
              },
            ]}
          >
            No location available
          </Text>
        </View>
      )}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  noLocationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 150, // Adjust size as needed
    height: 150, // Adjust size as needed
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Adjust as needed
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  headerIcon: {
    fontSize: 20,
    fontWeight: "bold",
  },
  selectedItem: {
    backgroundColor: Colors.primary,
  },
  container: { flex: 1 },
  map: { flex: 1, borderRadius: 20 },
  iconRow: {
    position: "absolute",
    top: Platform.OS === "ios" ? 40 : 5,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  iconButton: {
    padding: 10,
    marginHorizontal: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "left",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "flex-start",
  },
  searchModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  searchModalContent: {
    width: "90%",
    height: "50%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  dropdownModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdownContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  dropdownItemText: {
    fontSize: 16,
    fontFamily: "Avenir-Regular",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  closeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  openingHoursContainer: {
    backgroundColor: "#f5f5f5",
    padding: 5,
    marginTop: 5,
    marginBottom: 7,
    borderRadius: 5,
  },
  placeName: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  placeDetails: { fontSize: 14, marginBottom: 5 },
  placeImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
    resizeMode: "cover",
  },
  loadingText: { textAlign: "center", padding: 20 },
  actionButton: {
    backgroundColor: "#E1801C",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const autoComplete = {
  textInputContainer: {
    width: "100%",
    paddingTop: 30,
    fontFamily: "Avenir-Regular",
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    color: "#5d5d5d",
    fontSize: 18,
    fontFamily: "Avenir-Regular",
    borderRadius: 5,
    paddingLeft: 10,

    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  predefinedPlacesDescription: {
    color: "#1faadb",
    fontFamily: "Avenir-Regular",
  },
};
