import { Box, Container, Heading, Skeleton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { AllForms } from "../components/AllForms";
import { useAuth } from "../utils/AuthContext";

const forms = ({ data }) => {
  return (
    <Container maxW="80%" my={5}>
      <AllForms />
    </Container>
  );
};

export default forms;
