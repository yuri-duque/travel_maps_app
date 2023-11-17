import { View } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { InputText } from "../uiElements/Inputs/InputText";
import placesAutocompleteService from "../../services/placesAutocomplete/placesAutocompleteService";

export default function PlacesAutocomplete() {
  const [input, setInput] = useState<string>();

  useEffect(() => {
    placesAutocompleteService.autocompleteByCurrentLocation(input);
  }, [input]);

  async function autoComplete(input: string) {}

  return (
    <View style={styles.container} pt="3" px="3">
      <InputText autoCapitalize="none" value={input} onChangeText={setInput} placeholder="search" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    zIndex: 10,
  },
});
