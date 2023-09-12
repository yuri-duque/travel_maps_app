import React from "react";
import { Box, Pressable, VStack } from "native-base";

type CardProps = {
  onPress?: () => void;
  children?: React.ReactNode;
};

export function Card({ onPress, children }: CardProps) {
  return (
    <Pressable onPress={onPress} w="full">
      <Box
        w="full"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        backgroundColor={"white"}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
      >
        <VStack p="4" alignItems="center">
          {children}
        </VStack>
      </Box>
    </Pressable>
  );
}
