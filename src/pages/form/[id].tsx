import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../utils/api";
import { useAuth } from "../../utils/AuthContext";

interface FormProps {}

const Form: React.FC<FormProps> = ({}) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState(null);
  const [formloading, setformLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const getForm = async () => {
    if (id) {
      try {
        setformLoading(true);
        console.log(id);
        const response = await api.get(`/form/${id}`);
        if (response.data) {
          console.log(response.data);
          setForm(response.data);
          setformLoading(false);
        }
      } catch (e) {
        setformLoading(false);
        console.log(e);
      }
    }
  };
  useEffect(() => {
    getForm();
  }, [id]);
  if (!loading && !isAuthenticated) {
    router.replace(`/login?next=/form/${id}`);
  }
  if (!formloading && !form) {
    return (
      <Box
        backgroundColor={useColorModeValue("gray.50", "gray.50")}
        display={"flex"}
        height="100vh"
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Heading size={"md"} my={3}>
          Loading...
        </Heading>
      </Box>
    );
  } else if (form && !loading && !formloading) {
    return (
      <Container
        maxW={"80%"}
        shadow="md"
        p={5}
        my={5}
        rounded={"sm"}
        backgroundColor={useColorModeValue("gray.50", "gray.700")}
      >
        <Heading my={3}>{form.title}</Heading>
        <hr />
        <Text my={1}>{form.customerCompanyName}</Text>
        <Text>{form.customerName}</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid my={3} columns={[1, null, 2]}>
            {form.formFields.map((field) => {
              return (
                <FormControl key={field.id} isRequired mr={3}>
                  <FormLabel>{field.title} </FormLabel>
                  <Input
                    type={field.dataType}
                    placeholder={field.title}
                    {...register(field.title)}
                  />
                </FormControl>
              );
            })}
          </SimpleGrid>
          <Button type="submit">Submit</Button>
        </form>
      </Container>
    );
  } else {
    return (
      <Container maxW={"80%"} mt={6}>
        <Heading>
          We could not find the form you are looking for. <br />
          Please go back and try again
        </Heading>
      </Container>
    );
  }
};

export default Form;
