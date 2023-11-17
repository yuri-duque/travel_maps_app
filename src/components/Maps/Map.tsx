import React, { useEffect, useRef } from "react";
import MapView, { LatLng, Marker, Region } from "react-native-maps";
import { StyleSheet } from "react-native";
import * as Location from "expo-location";
import { SafeArea } from "../uiElements/SafeArea/SafeArea";
import { InputText } from "../uiElements/Inputs/InputText";
import { Button } from "native-base";
import { SolidButton } from "../uiElements/Buttons/SolidButton";

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

  const mapRef = useRef<MapView>(null);

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
    <>
      <MapView
        ref={mapRef}
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
      <SolidButton
        w="full"
        onPress={() => {
          try {
            console.log("entrou");
            const region: Region = {
              latitude: -21.779196,
              longitude: -43.319746,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009,
            };
            mapRef.current?.animateToRegion(region, 800);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Animate
      </SolidButton>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "90%",
  },
});
