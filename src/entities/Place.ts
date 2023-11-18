import { LatLng } from "react-native-maps";

export type Place = {
  place_id: string;
  description: string;
  address: string;
  types: string[];
  location: LatLng;
  icon: string;
  price_lavel: number;
  rating: number;
};
