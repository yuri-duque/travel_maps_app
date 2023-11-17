import autoCompleteApi from "../../api/requests/autoCompleteApi";
import { Place } from "../../entities/Place";

async function autocompleteByCurrentLocation(input?: string) {
  if (!input || input.length <= 2) return;

  const results = await autoCompleteApi.autoComplete(input);

  if (!results) return;

  const places = results?.map((result) => {
    const { description, place_id, types } = result;

    const place: Place = { description, place_id, types };

    return place;
  });

  return places;
}

export default { autocompleteByCurrentLocation };
