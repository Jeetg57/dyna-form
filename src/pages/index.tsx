import { Container } from "@chakra-ui/react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";

import { FormBlueprint } from "../components/FormBlueprint";

const Index = () => (
  <Container maxW="80%">
    <DarkModeSwitch />
    <FormBlueprint />
  </Container>
);

export default Index;
