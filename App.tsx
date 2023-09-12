import React, { useEffect } from "react";
import MapView, { LatLng, Marker, AnimatedRegion } from "react-native-maps";
import { Button, StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import { Dimensions } from "react-native";

type Marker = {
  latLng: LatLng;
  title: string;
  description: string;
};

const initialMarkers: Marker[] = [
  {
    latLng: { latitude: 48.866534, longitude: 2.361626 },
    title: "Paris",
    description: "Paris",
  },
  {
    latLng: { latitude: 48.84944, longitude: 2.41653 },
    title: "Paris",
    description: "Paris",
  },
];

export default function App() {
  const [region, setRegion] = React.useState<any>(null);
  const [markers, setMarkers] = React.useState(initialMarkers);

  function onRegionChange(region: any) {
    setRegion(region);
  }

  function addMarker(latLng: LatLng, title = "Paris", description = "Paris") {
    const newMarkers = [...markers];
    newMarkers.push({
      latLng,
      title,
      description,
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
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          initialRegion={region}
          onRegionChange={onRegionChange}
          showsUserLocation
          followsUserLocation
          zoomEnabled
          scrollEnabled
          showsScale
          // onLongPress={(e) => {
          //   addMarker(e.nativeEvent.coordinate);
          // }}
          // onMarkerPress={(e) => {
          //   console.log(e.nativeEvent);
          // }}
          // onPoiClick={(e) => {
          //   addMarker(e.nativeEvent.coordinate, e.nativeEvent.name);
          // }}
        >
          {/* {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latLng}
              title={marker.title}
              description={marker.description}
            />
          ))} */}
        </MapView>
      )}
    </View>
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
