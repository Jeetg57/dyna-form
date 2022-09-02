import { Container } from "@chakra-ui/react";
import React from "react";
import { FormBlueprint } from "../../components/FormBlueprint";

interface createProps {}

const create: React.FC<createProps> = ({}) => {
  return (
    <Container maxW={"80%"}>
      <FormBlueprint />
    </Container>
  );
};

export default create;
