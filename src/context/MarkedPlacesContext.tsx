import React, { useState, createContext } from "react";

import { Place } from "../entities/Place";
import placeByIdService from "../services/placeByIdService/placeByIdService";

type MarkedPlacesContextType = {
  markedPlaces?: Place[] | undefined;
  addMarkedPlace: (places: Place[] | undefined) => void;
};

const defaultMarkedPlacesContextContext: MarkedPlacesContextType = {
  markedPlaces: undefined,
  addMarkedPlace: () => {},
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

    places.forEach((place) => {
      placeByIdService.getPlaceById(place).then((newPlace) => {
        if (!newPlace) return;

        const newPlaces = places.map((place) => {
          if (place.place_id === newPlace.place_id) place = newPlace;
          return place;
        });

        setMarkedPlaces(newPlaces);
      });
    });
  }

  return (
    <MarkedPlacesContext.Provider value={{ markedPlaces, addMarkedPlace }}>
      {children}
    </MarkedPlacesContext.Provider>
  );
};

export { MarkedPlacesContextProvider, MarkedPlacesContext };
