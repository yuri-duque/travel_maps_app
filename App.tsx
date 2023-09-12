import React, { useEffect } from "react";
import MapView, { LatLng, Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import * as Location from "expo-location";
import {
  IInputProps,
  Input,
  NativeBaseProvider,
  ScrollView,
  Text,
  View,
} from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeArea } from "./src/components/uiElements/SafeArea/SafeArea";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

type Marker = {
  name: string;
  coordinate: LatLng;
  placeId: string;
};

const initialMarkers: Marker[] = [
  {
    name: "Paris",
    coordinate: { latitude: 48.866534, longitude: 2.361626 },
    placeId: "",
  },
  {
    name: "Paris",
    coordinate: { latitude: 48.84944, longitude: 2.41653 },
    placeId: "",
  },
];

export default function App() {
  const [region, setRegion] = React.useState<any>(null);
  const [markers, setMarkers] = React.useState(initialMarkers);

  function onRegionChange(region: any) {
    setRegion(region);
  }

  function addMarker({ coordinate, name, placeId }: Marker) {
    const newMarkers = [...markers];
    newMarkers.push({
      coordinate,
      name,
      placeId,
    });
    setMarkers(newMarkers);
  }

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});

    const current: LatLng = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setRegion({
      ...current,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009,
    });
  }

  useEffect(() => {
    getLocationPermission();
  }, []);

  const SearchInput = (props: IInputProps) => {
    return (
      <Input placeholder="Search" w="full" bgColor="white">
        {props.children}
      </Input>
    );
  };

  const myKey = "AIzaSyC9kogNwEtX1xBO-nNzawbDCKno5JqGhCY";

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <SafeArea>
          <View p="4" w="full" h="full">
            <GooglePlacesAutocomplete
              placeholder="Search destination"
              minLength={2}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
              }}
              nearbyPlacesAPI="GoogleReverseGeocoding"
              query={{
                key: myKey,
                language: "pt-br",
                components: "country:br",
                rankby: "distance",
              }}
              enablePoweredByContainer={false}
              minLength={3}
              renderRow={(rowData) => {
                if (!rowData) return <></>;

                const title = rowData.structured_formatting.main_text;
                const address = rowData.structured_formatting.secondary_text;
                const test = rowData.types.join(",   ");

                console.log("test:", test);

                return (
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        flexWrap: "wrap",
                      }}
                    >
                      {title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        flexWrap: "wrap",
                        fontWeight: "300",
                      }}
                    >
                      {address}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        flexWrap: "wrap",
                        fontWeight: "300",
                      }}
                    >
                      {test}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          {/* <View zIndex={0}>
            <MapView
              style={styles.map}
              initialRegion={region}
              onRegionChange={onRegionChange}
              showsUserLocation
              followsUserLocation
              zoomEnabled
              scrollEnabled
              showsScale
              onLongPress={(e) => {
                const { coordinate } = e.nativeEvent;
                addMarker({ name: "custom", coordinate, placeId: "" });
              }}
              onMarkerPress={(e) => {
                console.log(e.nativeEvent);
              }}
              onPoiClick={(e) => {
                const { name, coordinate, placeId } = e.nativeEvent;
                addMarker({ name, coordinate, placeId });
              }}
              showsMyLocationButton={false}
            >
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={marker.coordinate}
                  title={marker.name}
                />
              ))}
            </MapView>
          </View> */}
        </SafeArea>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
