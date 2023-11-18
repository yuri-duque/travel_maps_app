import React, { useState, createContext } from "react";

import { Marker } from "react-native-svg";

type MarkersContextType = {
  markers?: Marker[] | undefined;
  setMarkers: (places: Marker[] | undefined) => void;
};

const defaultMarkersContextContext: MarkersContextType = {
  markers: undefined,
  setMarkers: () => {},
};

const MarkersContext = createContext<MarkersContextType>(defaultMarkersContextContext);

const MarkersContextProvider = ({ children }: any) => {
  const [markers, setMarkers] = useState<Marker[] | undefined>();

  return (
    <MarkersContext.Provider value={{ markers, setMarkers }}>{children}</MarkersContext.Provider>
  );
};

export { MarkersContextProvider, MarkersContext };
