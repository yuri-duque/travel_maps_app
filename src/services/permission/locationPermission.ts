import { LatLng } from "react-native-maps";
import * as Location from "expo-location";
import { showMessage } from "react-native-flash-message";

async function getLocationPermission() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    showMessage({
      message: "Permission denied",
      type: "danger",
    });
    alert();
    return false;
  }

  return true;
}

async function getCurrentLocation() {
  const permissionEnabled = await getLocationPermission();
  if (!permissionEnabled) return;

  let location = await Location.getCurrentPositionAsync({});

  const current: LatLng = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };

  return {
    ...current,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  };
}

export default { getCurrentLocation, getLocationPermission };
