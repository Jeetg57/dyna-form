import { Container } from "@chakra-ui/react";
import React from "react";
import { AllForms } from "../components/AllForms";

interface formsProps {}

const forms: React.FC<formsProps> = ({}) => {
  return (
    <Container maxW="80%" my={5}>
      <AllForms />
    </Container>
  );
};
export default forms;
