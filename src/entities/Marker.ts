import { LatLng } from "react-native-maps";

export type Marker = {
  _id?: string;
  place_id: string;
  description: string;
  place_types?: string[];
  country?: string;
  city?: string;
  location: LatLng;
  icon?: string;
  color?: string;
};
