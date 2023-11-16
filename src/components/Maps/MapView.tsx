import React, { useEffect } from "react";
import MapView, { LatLng, Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import * as Location from "expo-location";
import { SafeArea } from "../uiElements/SafeArea/SafeArea";

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

export default function Map() {
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

  const myKey = "AIzaSyC9kogNwEtX1xBO-nNzawbDCKno5JqGhCY";

  return (
    <SafeArea>
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
        showsMyLocationButton={false}
      >
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker.coordinate} title={marker.name} />
        ))}
      </MapView>
    </SafeArea>
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
