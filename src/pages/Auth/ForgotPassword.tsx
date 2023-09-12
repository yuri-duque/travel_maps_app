import React from "react";
import { Center, Icon, Text, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { InputText } from "../../components/UiElements/Inputs/InputText";
import { Card } from "../../components/UiElements/Card/Card";
import { SolidButton } from "../../components/UiElements/Buttons/SolidButton";
import { OutlineButton } from "../../components/UiElements/Buttons/OutilineButton";

export function ForgotPassword() {
  const navigation = useNavigation<appNavigationStack>();

  async function handleForgotPassword() {
    navigation.goBack();
  }

  async function handleCancel() {
    navigation.goBack();
  }

  return (
    <>
      <Center h="full" p="6" backgroundColor="gray.300">
        <Card>
          <Center>
            <Text
              color={"blue.700"}
              fontSize={"lg"}
              fontWeight={"semibold"}
              letterSpacing={"xl"}
              mb="4"
            >
              Esqueci minha senha
            </Text>
          </Center>
          <InputText
            label="Email"
            autoCapitalize="none"
            InputLeftElement={
              <Icon as={<MaterialIcons name={"person"} />} size={5} ml="2" color="muted.400" />
            }
          />

          <VStack w="full" space="4" mt="6">
            <SolidButton w="full" onPress={handleForgotPassword}>
              Enviar email
            </SolidButton>
            <OutlineButton w="full" onPress={handleCancel}>
              Cancelar
            </OutlineButton>
          </VStack>
        </Card>
      </Center>
    </>
  );
}
