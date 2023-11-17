import autoCompleteApi from "../../api/requests/autoCompleteApi";

async function autocompleteByCurrentLocation(input?: string) {
  if (!input || input.length <= 2) return;

  const result = await autoCompleteApi.autoComplete(input);
}

export default { autocompleteByCurrentLocation };
