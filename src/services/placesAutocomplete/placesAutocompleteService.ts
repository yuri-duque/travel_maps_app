import { LatLng } from "react-native-maps";
import autoCompleteApi from "../../api/requests/autoCompleteApi";
import { Place } from "../../entities/Place";

async function autocompleteByCurrentLocation(input: string, location: LatLng) {
  if (!input || input.length <= 2) return;

  const results = await autoCompleteApi.autoComplete(input, location);

  if (!results) return;

  const places = results?.map((result) => {
    const { structured_formatting, place_id, types } = result;

    const description = structured_formatting.main_text;
    const address = structured_formatting.secondary_text;

    return { description, address, place_id, types } as Place;
  });

  return places;
}

export default { autocompleteByCurrentLocation };
