import React, { MutableRefObject } from "react";
import MapView, { LatLng, Marker as MarkerComponent, Region } from "react-native-maps";
import { StyleSheet } from "react-native";
import { Marker } from "../../entities/Marker";
import { Place } from "../../entities/Place";

interface MapProps {
  mapRef: MutableRefObject<MapView | null>;
  addMarker: (place_id: string, description: string, location: LatLng) => void;
  addMarkerByLocation: (location: LatLng) => void;
  markers: Marker[];
  markedPlaces: Place[] | undefined;
}

export default function Map({
  mapRef,
  addMarker,
  addMarkerByLocation,
  markers,
  markedPlaces,
}: MapProps) {
  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      showsUserLocation
      followsUserLocation
      zoomEnabled
      scrollEnabled
      showsScale
      onLongPress={(e) => {
        const { coordinate } = e.nativeEvent;
        addMarkerByLocation(coordinate);
      }}
      onMarkerPress={(e) => {
        console.log(e.nativeEvent);
      }}
      onPoiClick={(e) => {
        const { name, coordinate, placeId } = e.nativeEvent;
        addMarker(placeId, name, coordinate);
      }}
      showsMyLocationButton={false}
    >
      {markers &&
        markers.map((marker, index) => (
          <MarkerComponent key={index} coordinate={marker.location} title={marker.description} />
        ))}
      {markedPlaces &&
        markedPlaces.map((place, index) => {
          if (!place.location) return;

          return (
            <MarkerComponent
              key={place.place_id}
              coordinate={place.location}
              title={place.description}
              pinColor="gray"
            />
          );
        })}
    </MapView>
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
