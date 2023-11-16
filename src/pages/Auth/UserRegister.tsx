import React from "react";
import { Center, Icon, Text, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Card } from "../../components/uiElements/Card/Card";
import { SolidButton } from "../../components/uiElements/Buttons/SolidButton";
import { OutlineButton } from "../../components/uiElements/Buttons/OutilineButton";
import { InputPassword } from "../../components/uiElements/Inputs/InputPassword";
import { appNavigationStack } from "../../routes/appRoutes";
import { InputText } from "../../components/uiElements/Inputs/InputText";

export function UserRegister() {
  const navigation = useNavigation<appNavigationStack>();

  async function handleRegister() {
    console.log("register");
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
              Cadastrar
            </Text>
          </Center>
          <InputText label="Nome" />
          <InputText
            label="Email"
            autoCapitalize="none"
            InputLeftElement={
              <Icon as={<MaterialIcons name={"person"} />} size={5} ml="2" color="muted.400" />
            }
          />
          <InputPassword label="Senha" />

          <VStack w="full" space="4" mt="6">
            <SolidButton w="full" onPress={handleRegister}>
              Cadastrar
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
