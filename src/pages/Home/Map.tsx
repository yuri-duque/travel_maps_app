import React, { useEffect } from "react";
import MapView, { LatLng, Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import { SafeArea } from "../../components/uiElements/SafeArea/SafeArea";
import locationPermission from "../../services/permission/locationPermission";
import PlacesAutocomplete from "../../components/placesAutocomplete/placesAutocomplete";
import navigator from "react-native-geolocation-service";

type Marker = {
  name: string;
  coordinate: LatLng;
  placeId: string;
};

const initialMarkers: Marker[] = [];

export default function Map() {
  const [currentLocation, setRegion] = React.useState<any>(null);
  const [markers, setMarkers] = React.useState(initialMarkers);

  function onRegionChange(currentLocation: any) {
    setRegion(currentLocation);
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
    const location = await locationPermission.getCurrentLocation();
    setRegion({
      location,
    });
  }

  useEffect(() => {
    getLocationPermission();
  }, []);

  return (
    <SafeArea>
      <PlacesAutocomplete />

      <MapView
        style={styles.map}
        initialRegion={currentLocation}
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
    position: "absolute",
    zIndex: 0,
    elevation: 0,
    width: "100%",
    height: "100%",
  },
});
