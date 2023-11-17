import React, { useEffect, useRef } from "react";
import Map from "../../components/maps/Map";
import { View } from "native-base";
import { StyleSheet } from "react-native";
import MapView, { Region } from "react-native-maps";
import locationPermission from "../../services/permission/locationPermission";
import { SolidButton } from "../../components/uiElements/Buttons/SolidButton";
import PlacesAutocomplete from "../../components/placesAutocomplete/placesAutocomplete";

export default function Home() {
  const mapRef = useRef<MapView>(null);

  const [region, setRegion] = React.useState<Region>();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  async function getCurrentLocation() {
    const current = await locationPermission.getCurrentLocation();
    if (!current) return;
    const newRegion: Region = { ...current, latitudeDelta: 0.009, longitudeDelta: 0.009 };
    setRegion(newRegion);
  }

  async function animateToRegion(region: Region, duration: number = 800) {
    mapRef.current?.animateToRegion(region, duration);
  }

  return (
    <View style={styles.view}>
      <View style={styles.autocomplete}>
        <PlacesAutocomplete />
      </View>

      <SolidButton
        style={{ marginTop: 24, paddingHorizontal: 12, zIndex: 2 }}
        onPress={() => {
          const region: Region = {
            latitude: -21.779196,
            longitude: -43.319746,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          };
          animateToRegion(region);
        }}
      >
        Animate
      </SolidButton>

      <View style={styles.map}>
        <Map mapRef={mapRef} region={region} />
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
