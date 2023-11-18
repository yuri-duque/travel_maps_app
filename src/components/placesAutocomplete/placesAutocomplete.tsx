import { Box, HStack, Icon, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import placesAutocompleteService from "../../services/placesAutocomplete/placesAutocompleteService";
import { ScrollView } from "react-native-virtualized-view";
import { Place } from "../../entities/Place";
import { TextInput } from "react-native";
import HR from "../uiElements/hr/Hr";
import placeByIdService from "../../services/placeByIdService/placeByIdService";
import { TouchableOpacity } from "react-native";
import { LatLng } from "react-native-maps";
import { Image } from "react-native";

interface PlacesAutocompleteProps {
  currentLocation: LatLng;
  animateToRegion: (region: LatLng, duration?: number) => void;
  setMarkedPlaces: (places: Place[] | undefined) => void;
}

export default function PlacesAutocomplete({
  currentLocation,
  animateToRegion,
  setMarkedPlaces,
}: PlacesAutocompleteProps) {
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

  useEffect(() => {
    setMarkedPlaces(places);
  }, [places]);

  async function autoComplete(text?: string) {
    if (!text) {
      setPlaces(undefined);
      return;
    }

    const places = await placesAutocompleteService.autocompleteByCurrentLocation(
      text,
      currentLocation
    );

    getPlacesCordination(places);
  }

  async function getPlacesCordination(places?: Place[]) {
    if (!places || places.length === 0) return;

    places.forEach((place) => {
      placeByIdService.getPlaceById(place).then((newPlace) => {
        if (!newPlace) return;

        const newPlaces = places.map((place) => {
          if (place.place_id === newPlace.place_id) place = newPlace;
          return place;
        });

        setPlaces(newPlaces);
      });
    });
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
                  <TouchableOpacity
                    key={index}
                    style={styles.button}
                    onPress={() => animateToRegion(place.location)}
                  >
                    <HStack space={2} alignItems={"center"}>
                      <Image style={styles.icon} source={{ uri: place.icon }} />
                      <Text>{place.description}</Text>
                    </HStack>
                  </TouchableOpacity>
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
  icon: {
    width: 16,
    height: 16,
  },
  button: {
    marginVertical: 8,
  },
});
