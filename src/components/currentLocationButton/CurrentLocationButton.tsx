import React from "react";
import { Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

interface CurrentLocationButtonProps {
  getCurrentLocation: () => void;
}

export default function CurrentLocationButton({ getCurrentLocation }: CurrentLocationButtonProps) {
  return (
    <Button rounded="full" onPress={() => getCurrentLocation()} style={styles.button}>
      <MaterialIcons name={"gps-fixed"} size={24} color={"#9aa0a6"} />
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    position: "absolute",
    zIndex: 2,
    bottom: 12,
    right: 12,
  },
});
