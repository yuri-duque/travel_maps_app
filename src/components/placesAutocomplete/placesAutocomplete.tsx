import { View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function PlacesAutocomplete() {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Type a place"
        query={{ key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY }}
        minLength={2}
        fetchDetails={true}
        enablePoweredByContainer={false}
        currentLocation={true}
        currentLocationLabel="Current location"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    height: "50%",
    padding: 12,
    zIndex: 10,
  },
});
