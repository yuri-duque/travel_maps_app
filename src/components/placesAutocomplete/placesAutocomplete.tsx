import { Center, HStack, Text, VStack, View } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { LatLng } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";

import placesAutocompleteService from "../../services/placesAutocomplete/placesAutocompleteService";
import { ScrollView } from "react-native-virtualized-view";
import HR from "../uiElements/hr/Hr";
import { MarkedPlacesContext } from "../../context/MarkedPlacesContext";

interface PlacesAutocompleteProps {
  currentLocation: LatLng;
  animateToRegion: (region: LatLng, duration?: number) => void;
  openPlacesResult: boolean;
  setOpenPlacesResult: (openPlacesResult: boolean) => void;
}

export default function PlacesAutocomplete({
  currentLocation,
  animateToRegion,
  openPlacesResult,
  setOpenPlacesResult,
}: PlacesAutocompleteProps) {
  const [text, setText] = useState<string>();

  const { markedPlaces, addMarkedPlace, getPlaceDetails } = useContext(MarkedPlacesContext);

  const debaucingTime = Number(process.env.EXPO_PUBLIC_PLACES_AUTOCOMPLETE_DEBOUNCING_TIME || 750);

  useEffect(() => {
    const timerId = setTimeout(() => {
      autoComplete(text);
    }, debaucingTime);

    // Cleanup function to clear the timeout if a new letter is typed within 1 second
    return () => clearTimeout(timerId);
  }, [text]);

  async function autoComplete(text?: string) {
    if (!text) {
      addMarkedPlace(undefined);
      return;
    }

    const places = await placesAutocompleteService.autocompleteByCurrentLocation(
      text,
      currentLocation
    );

    addMarkedPlace(places);
  }

  return (
    <View style={styles.container} pt="3" px="3">
      <View style={styles.placesContainer}>
        <HStack>
          <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            placeholder="Search"
            placeholderTextColor="gray"
            onPressIn={() => setOpenPlacesResult(true)}
          />
          {text && (
            <TouchableOpacity
              onPress={() => {
                setText("");
                addMarkedPlace(undefined);
              }}
              style={{ height: 40 }}
            >
              <Center style={{ height: 40 }}>
                <MaterialIcons name={"close"} size={24} color={"#9aa0a6"} />
              </Center>
            </TouchableOpacity>
          )}
        </HStack>

        {markedPlaces && markedPlaces.length > 0 && (
          <>
            {openPlacesResult && (
              <>
                <HR px={2} />
                <ScrollView style={styles.placesList}>
                  {markedPlaces?.map((place, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.button}
                        onPress={async () => {
                          if (!place.location) {
                            const newPlace = await getPlaceDetails(place, markedPlaces);
                            if (!newPlace) return;
                            place = newPlace;
                          }
                          animateToRegion(place.location);
                        }}
                      >
                        <HStack space={2} alignItems={"center"}>
                          <Image style={styles.icon} source={{ uri: place.icon }} />
                          <VStack>
                            <Text fontWeight={"bold"} fontSize={16}>
                              {place.description}
                            </Text>
                            <Text fontSize={12}>{place.address}</Text>
                          </VStack>
                        </HStack>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
                <HR px={2} />
              </>
            )}

            <TouchableOpacity onPress={() => setOpenPlacesResult(!openPlacesResult)}>
              <View
                alignItems={"center"}
                style={{ position: "relative", height: openPlacesResult ? 32 : 20 }}
              >
                <MaterialIcons
                  name={openPlacesResult ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                  size={32}
                  color={"#9aa0a6"}
                  style={{ position: "absolute", top: openPlacesResult ? 0 : -10 }}
                />
              </View>
            </TouchableOpacity>
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
    borderRadius: 16,
  },
  input: {
    height: 40,
    paddingLeft: 20,
    borderWidth: 0,
    fontSize: 16,
    width: "90%",
  },
  placesList: {
    paddingHorizontal: 12,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  button: {
    marginVertical: 6,
  },
  arrowContainer: {
    position: "relative",
    height: 20,
  },
  arrowIcon: {},
});
