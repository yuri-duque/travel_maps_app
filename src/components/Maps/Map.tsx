import React, { MutableRefObject } from "react";
import MapView, { LatLng, Marker, Region } from "react-native-maps";
import { StyleSheet } from "react-native";

type Marker = {
  name: string;
  coordinate: LatLng;
  placeId: string;
};

interface MapProps {
  mapRef: MutableRefObject<MapView | null>;
  region?: Region;
}

export default function Map({ mapRef, region }: MapProps) {
  const [markers, setMarkers] = React.useState<Marker[]>([]);

  function addMarker({ coordinate, name, placeId }: Marker) {
    const newMarkers = [...markers];
    newMarkers.push({
      coordinate,
      name,
      placeId,
    });
    setMarkers(newMarkers);
  }

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={region}
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
