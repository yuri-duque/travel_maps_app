import { LatLng } from "react-native-maps";

export interface Place {
  place_id: string;
  description: string;
  types: string[];
  location: LatLng;
  icon: string;
  price_lavel: number;
  rating: number;
}
