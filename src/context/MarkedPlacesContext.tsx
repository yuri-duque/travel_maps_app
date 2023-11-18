import React, { useState, createContext } from "react";

import { Place } from "../entities/Place";
import placeByIdService from "../services/placeByIdService/placeByIdService";

type MarkedPlacesContextType = {
  markedPlaces?: Place[] | undefined;
  addMarkedPlace: (places: Place[] | undefined) => void;
  getPlaceDetails: (place: Place, places: Place[]) => Promise<Place | undefined>;
};

const defautlPlace: Place = {
  place_id: "",
  description: "",
  address: "",
  location: { latitude: 0, longitude: 0 },
  types: [],
  icon: "",
  price_lavel: 0,
  rating: 0,
};

const defaultMarkedPlacesContextContext: MarkedPlacesContextType = {
  markedPlaces: undefined,
  addMarkedPlace: () => {},
  getPlaceDetails: async () => defautlPlace,
};

const MarkedPlacesContext = createContext<MarkedPlacesContextType>(
  defaultMarkedPlacesContextContext
);

const MarkedPlacesContextProvider = ({ children }: any) => {
  const [markedPlaces, setMarkedPlaces] = useState<Place[] | undefined>();

  async function addMarkedPlace(places: Place[] | undefined) {
    if (!places || places.length === 0) {
      setMarkedPlaces(undefined);
      return;
    }

    // await getPlaceDetails(places[0], places);
  }

  async function getPlaceDetails(place: Place, places: Place[]) {
    const newPlace = await placeByIdService.getPlaceById(place);
    if (!newPlace) return;

    const newPlaces = places.map((place) => {
      if (place.place_id === newPlace.place_id) place = newPlace;
      return place;
    });

    setMarkedPlaces(newPlaces);

    return newPlace;
  }

  return (
    <MarkedPlacesContext.Provider value={{ markedPlaces, addMarkedPlace, getPlaceDetails }}>
      {children}
    </MarkedPlacesContext.Provider>
  );
};

export { MarkedPlacesContextProvider, MarkedPlacesContext };
