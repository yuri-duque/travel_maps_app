import React from "react";
import { SafeArea } from "../../components/uiElements/SafeArea/SafeArea";
import PlacesAutocomplete from "../../components/placesAutocomplete/placesAutocomplete";
import Map from "../../components/maps/Map";
import { View } from "native-base";
import { StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.view}>
      <View style={styles.autocomplete}>
        <SafeArea backgroundColor="transparent">
          <PlacesAutocomplete />
        </SafeArea>
      </View>

      <View style={styles.map}>
        <Map />
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
  },
});
