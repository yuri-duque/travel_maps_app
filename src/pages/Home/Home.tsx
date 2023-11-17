import React from "react";
import { SafeArea } from "../../components/uiElements/SafeArea/SafeArea";
import PlacesAutocomplete from "../../components/placesAutocomplete/placesAutocomplete";
import Map from "../../components/maps/Map";
import { View } from "native-base";
import { StyleSheet } from "react-native";

export default function Home() {
  return (
    <SafeArea>
      <View style={styles.autocomplete}>
        <PlacesAutocomplete />
      </View>

      <View style={styles.map}>
        <Map />
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
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
  },
});
