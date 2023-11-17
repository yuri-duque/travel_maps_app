import placeByIdApi from "../../api/requests/placeByIdApi";
import { Place } from "../../entities/Place";

async function getPlaceById(place: Place) {
  const result = await placeByIdApi.placeById(place.place_id);

  if (!result) return;

  place.location = {
    latitude: result.geometry.location.lat,
    longitude: result.geometry.location.lng,
  };
  place.icon = result.icon;
  place.price_lavel = result.price_lavel;
  place.rating = result.rating;

  return place;
}

export default { getPlaceById };
