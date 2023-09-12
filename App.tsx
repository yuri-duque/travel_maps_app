import React, { useEffect } from "react";
import MapView, { LatLng, Marker, AnimatedRegion } from "react-native-maps";
import { Button, StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import { Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Input, NativeBaseProvider } from "native-base";

type Marker = {
  name: string;
  coordinate: LatLng;
  placeId: string;
};

const initialMarkers: Marker[] = [
  {
    name: "Paris",
    coordinate: { latitude: 48.866534, longitude: 2.361626 },
    placeId: "",
  },
  {
    name: "Paris",
    coordinate: { latitude: 48.84944, longitude: 2.41653 },
    placeId: "",
  },
];

export default function App() {
  const [region, setRegion] = React.useState<any>(null);
  const [markers, setMarkers] = React.useState(initialMarkers);

  function onRegionChange(region: any) {
    setRegion(region);
  }

  function addMarker({ coordinate, name, placeId }: Marker) {
    const newMarkers = [...markers];
    newMarkers.push({
      coordinate,
      name,
      placeId,
    });
    setMarkers(newMarkers);
  }

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});

    const current: LatLng = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setRegion({
      ...current,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009,
    });
  }

  useEffect(() => {
    getLocationPermission();
  }, []);

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={region}
          onRegionChange={onRegionChange}
          showsUserLocation
          followsUserLocation
          zoomEnabled
          scrollEnabled
          showsScale
          onLongPress={(e) => {
            const { coordinate } = e.nativeEvent;
            addMarker({ name: "custom", coordinate, placeId: "" });
          }}
          onMarkerPress={(e) => {
            console.log(e.nativeEvent);
          }}
          onPoiClick={(e) => {
            const { name, coordinate, placeId } = e.nativeEvent;
            addMarker({ name, coordinate, placeId });
          }}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.name}
            />
          ))}
        </MapView>

        <GooglePlacesAutocomplete
          query={{
            key: "AIzaSyC9kogNwEtX1xBO-nNzawbDCKno5JqGhCY",
            language: "en", // language of the results
          }}
          onPress={(data, details) => console.log(data, details)}
          textInputProps={{
            InputComp: Input,
            leftIcon: { type: "font-awesome", name: "chevron-left" },
            errorStyle: { color: "red" },
          }}
          placeholder="Search"
        />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
