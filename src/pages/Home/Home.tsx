import React, { useEffect, useRef } from "react";
import { View } from "native-base";
import { StyleSheet } from "react-native";
import MapView, { LatLng } from "react-native-maps";

import Map from "../../components/maps/Map";
import locationPermission from "../../services/permission/locationPermission";
import PlacesAutocomplete from "../../components/placesAutocomplete/placesAutocomplete";
import { Marker } from "../../entities/Marker";
import { Place } from "../../entities/Place";

export default function Home() {
  const mapRef = useRef<MapView>(null);

  const [markers, setMarkers] = React.useState<Marker[]>([]);
  const [markedPlaces, setMarkedPlaces] = React.useState<Place[] | undefined>();
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

  function addMarker(place_id: string, description: string, location: LatLng) {
    const marker: Marker = {
      place_id,
      description,
      location,
    };

    const newMarkers = [...markers, marker];
    setMarkers(newMarkers);
  }

  function addMarkerByLocation(location: LatLng) {
    const marker: Marker = {
      place_id: "",
      description: "new location",
      location,
    };

    const newMarkers = [...markers, marker];
    setMarkers(newMarkers);
  }

  async function animateToRegion(location: LatLng, duration: number | undefined = 800) {
    const region = { ...location, latitudeDelta: 0.009, longitudeDelta: 0.009 };
    mapRef.current?.animateToRegion(region, duration);
  }

  return (
    <View style={styles.view}>
      <View style={styles.autocomplete}>
        <PlacesAutocomplete
          animateToRegion={animateToRegion}
          currentLocation={currentLocation}
          setMarkedPlaces={setMarkedPlaces}
        />
      </View>

      <View style={styles.map}>
        <Map
          mapRef={mapRef}
          addMarker={addMarker}
          addMarkerByLocation={addMarkerByLocation}
          markers={markers}
        />
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
