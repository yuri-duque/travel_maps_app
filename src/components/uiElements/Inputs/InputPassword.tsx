import React from "react";
import { FormControl, IInputProps, Icon, Input, Pressable } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

type InputPassword = IInputProps & {
  label: string;
  errorMessage?: string | null;
};

export function InputPassword({ label, errorMessage = null, ...props }: InputPassword) {
  const [show, setShow] = React.useState(false);

  return (
    <FormControl mb={4} isInvalid={!!errorMessage}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        fontSize={"md"}
        w="full"
        h="10"
        _focus={{ bg: "gray.100", borderWidth: 2, borderColor: "blue.300" }}
        type={show ? "text" : "password"}
        {...props}
        InputRightElement={
          <Pressable onPress={() => setShow(!show)}>
            <Icon
              as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
              size={5}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
