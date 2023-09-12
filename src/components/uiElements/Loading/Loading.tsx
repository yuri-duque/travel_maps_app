import React from "react";
import Spinner from "react-native-loading-spinner-overlay";

type LoadingProps = {
  visible: boolean;
};

export function Loading({ visible }: LoadingProps) {
  return <Spinner visible={visible} color="#1d4ed8" />;
}
