import { Box, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { InputText } from "../uiElements/Inputs/InputText";
import placesAutocompleteService from "../../services/placesAutocomplete/placesAutocompleteService";
import { ScrollView } from "react-native-virtualized-view";
import { Place } from "../../entities/Place";
import { TextInput } from "react-native";
import HR from "../uiElements/hr/Hr";

export default function PlacesAutocomplete() {
  const [text, setText] = useState<string>();
  const [places, setPlaces] = useState<Place[] | undefined>();

  const debaucingTime = Number(process.env.EXPO_PUBLIC_PLACES_AUTOCOMPLETE_DEBOUNCING_TIME || 750);

  useEffect(() => {
    const timerId = setTimeout(() => {
      autoComplete(text);
    }, debaucingTime);

    // Cleanup function to clear the timeout if a new letter is typed within 1 second
    return () => clearTimeout(timerId);
  }, [text]);

  async function autoComplete(text?: string) {
    const places = await placesAutocompleteService.autocompleteByCurrentLocation(text);
    setPlaces(places);
  }

  return (
    <View style={styles.container} pt="3" px="3">
      <View style={styles.placesContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="Search"
          placeholderTextColor="gray"
        />

        {places && places.length > 0 && (
          <>
            <HR px={2} />
            <ScrollView style={styles.placesList}>
              {places?.map((place, index) => {
                return (
                  <Box key={index} my="3" shadow={2}>
                    <Text>{place.description}</Text>
                  </Box>
                );
              })}
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    zIndex: 10,
  },

  placesContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
  },

  input: {
    height: 40,
    backgroundColor: "white",
    paddingLeft: 20,
    borderWidth: 0,
    borderRadius: 20,
    fontSize: 16,
  },

  placesList: {
    padding: 12,
  },
});
