import { Container, Heading } from "@chakra-ui/react";
import React from "react";
import { AllForms } from "../components/AllForms";
import { handleAuthSSR } from "../utils/auth";

const forms = ({ data }) => {
  return (
    <Container maxW="80%" my={5}>
      <Heading>{data?.username}</Heading>
      <AllForms />
    </Container>
  );
};
forms.getInitialProps = async (ctx: {
  res: {
    writeHead: (arg0: number, arg1: { Location: string }) => void;
    end: () => void;
  };
}) => {
  const data = await handleAuthSSR(ctx);
  console.log(data);

  return { data };
};
export default forms;
