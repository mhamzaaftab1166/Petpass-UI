import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Linking,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useFormikContext } from "formik";
import AppAlert from "../AppAlert/index";
import AppErrorMessage from "./AppErrorMessage";
import { Colors } from "../../theme/color";
import { useTheme } from "../../helper/themeProvider";

const AppMapLocationPicker = ({ name, style, ...otherProps }) => {
  const { setFieldValue, touched, errors, values } = useFormikContext();
  const { isDarkMode } = useTheme();
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true);

  const parseLocationUrl = (url) => {
    const match = url.match(/q=(-?\d+(\.\d+)?),(-?\d+(\.\d+)?)/);
    if (match) {
      const lat = parseFloat(match[1]);
      const lon = parseFloat(match[3]);
      return {
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    }
    return null;
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setShowAlert(true);
        setLoading(false);
        return;
      }
      if (values[name]) {
        if (
          typeof values[name] === "object" &&
          values[name].latitude &&
          values[name].longitude
        ) {
          const savedRegion = {
            latitude: values[name].latitude,
            longitude: values[name].longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setRegion(savedRegion);
          setMarker(savedRegion);
          setLoading(false);
          return;
        } else if (typeof values[name] === "string") {
          const parsedRegion = parseLocationUrl(values[name]);
          if (parsedRegion) {
            setRegion(parsedRegion);
            setMarker(parsedRegion);
            setLoading(false);
            return;
          }
        }
      }
      const { coords } = await Location.getCurrentPositionAsync({});
      const currentRegion = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(currentRegion);
      setLoading(false);
    })();
  }, [values[name]]);

  const handleMapPress = (e) => {
    const newCoordinate = e.nativeEvent.coordinate;
    const updatedMarker = {
      ...newCoordinate,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    const googleMapsLink = `https://www.google.com/maps?q=${newCoordinate.latitude},${newCoordinate.longitude}`;
    setMarker(updatedMarker);
    setFieldValue(name, googleMapsLink);
  };

  const handlePermissionRequest = async () => {
    setShowAlert(false);
    await Linking.openSettings();
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.errorContainer}>
        <AppErrorMessage error={errors[name]} visible={touched[name]} />
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>
            Waiting for current location...
          </Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          region={region}
          onPress={handleMapPress}
          {...otherProps}
          showsUserLocation
          showsMyLocationButton
        >
          {marker && (
            <Marker coordinate={marker} draggable onDragEnd={handleMapPress} />
          )}
        </MapView>
      )}

      <AppAlert
        showAlert={showAlert}
        title="Location Permission Needed"
        message="This feature requires access to your location. Please enable location services in your device settings."
        closeOnTouchOutside={false}
        showConfirmButton={true}
        confirmText="Access"
        onConfirmPressed={handlePermissionRequest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  errorContainer: {
    position: "absolute",
    top: 5,
    left: 5,
    right: 5,
    zIndex: 10,
  },
});

export default AppMapLocationPicker;
