import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  iconName: keyof typeof MaterialIcons.glyphMap;
  iconSize?: number;
  onPress?: () => void;
};

export function IconButton({ iconName, iconSize = 22, onPress }: Props) {
  const iconColor = "#9aa0a6";

  return <MaterialIcons name={iconName} size={iconSize} color={iconColor} onPress={onPress} />;
}
