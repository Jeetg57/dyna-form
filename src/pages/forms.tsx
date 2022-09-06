import { Container, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { AllForms } from "../components/AllForms";
import { useAuth } from "../utils/AuthContext";

const forms = ({ data }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) router.replace("/login?next=/forms");
  });
  return (
    <Container maxW="80%" my={5}>
      <Heading>{data?.username}</Heading>
      <AllForms />
    </Container>
  );
};

export default forms;
