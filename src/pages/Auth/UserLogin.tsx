import React, { useContext } from "react";
import { Center, Icon, Link, Text, VStack, View } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { login } from "../../services/auth/loginService";
import { UserContext } from "../../context/UserContext";
import { AppContext } from "../../context/AppContext";
import { authNavigationStack } from "../../routes/authRoutes";
import { Card } from "../../components/uiElements/Card/Card";
import { InputText } from "../../components/uiElements/Inputs/InputText";
import { InputPassword } from "../../components/uiElements/Inputs/InputPassword";
import { SolidButton } from "../../components/uiElements/Buttons/SolidButton";
import { OutlineButton } from "../../components/uiElements/Buttons/OutilineButton";

export function UserLogin() {
  const { showLoading } = useContext(AppContext);
  const { saveUser } = useContext(UserContext);
  const navigation = useNavigation<authNavigationStack>();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  async function handleForgotPassword() {
    navigation.push("forgotPassword");
  }

  async function handleLogin() {
    showLoading(true);
    const token = await login(email, password);
    showLoading(false);

    if (!token) return;

    saveUser(token);
  }

  async function handleRegister() {
    navigation.push("userRegister");
  }

  return (
    <>
      <Center h="full" p="6" backgroundColor="gray.300">
        <Card>
          <Text
            color={"blue.700"}
            fontSize={"lg"}
            fontWeight={"semibold"}
            letterSpacing={"xl"}
            mb="4"
          >
            Login
          </Text>
          <InputText
            label="Email"
            autoCapitalize="none"
            InputLeftElement={
              <Icon as={<MaterialIcons name={"person"} />} size={5} ml="2" color="muted.400" />
            }
            value={email}
            onChangeText={setEmail}
          />
          <InputPassword label="Senha" value={password} onChangeText={setPassword} />

          <View textAlign={"start"} w={"full"}>
            <Link onPress={handleForgotPassword}>Esqueci minha senha</Link>
          </View>

          <VStack w="full" space="4" mt="6">
            <SolidButton w="full" onPress={handleLogin}>
              Login
            </SolidButton>
            <OutlineButton w="full" onPress={handleRegister}>
              Cadastrar
            </OutlineButton>
          </VStack>
        </Card>
      </Center>
    </>
  );
}
