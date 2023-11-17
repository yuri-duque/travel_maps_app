import React, { useEffect, useRef } from "react";
import Map from "../../components/maps/Map";
import { View } from "native-base";
import { StyleSheet } from "react-native";
import MapView, { LatLng, Region } from "react-native-maps";
import locationPermission from "../../services/permission/locationPermission";
import { SolidButton } from "../../components/uiElements/Buttons/SolidButton";
import PlacesAutocomplete from "../../components/placesAutocomplete/placesAutocomplete";

export default function Home() {
  const mapRef = useRef<MapView>(null);

  const [currentLocation, setCurrentLocation] = React.useState<LatLng>({
    latitude: -22.9068467,
    longitude: -43.1728965,
  });

  useEffect(() => {
    getCurrentLocation();
  }, []);

  async function getCurrentLocation() {
    const current = await locationPermission.getCurrentLocation();
    if (!current) return;
    setCurrentLocation(current);
    animateToRegion(current);
  }

  async function animateToRegion(location: LatLng, duration: number | undefined = 800) {
    const region = { ...location, latitudeDelta: 0.009, longitudeDelta: 0.009 };

    mapRef.current?.animateToRegion(region, duration);
  }

  return (
    <View style={styles.view}>
      <View style={styles.autocomplete}>
        <PlacesAutocomplete animateToRegion={animateToRegion} currentLocation={currentLocation} />
      </View>

      <View style={styles.map}>
        <Map mapRef={mapRef} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
  },
  map: {
    position: "absolute",
    zIndex: 0,
    elevation: 0,
    width: "100%",
    height: "100%",
  },
  autocomplete: {
    zIndex: 1,
    elevation: 1,
    paddingTop: 24,
  },
});
