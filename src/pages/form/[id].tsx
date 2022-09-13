import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getForm, getForms } from "../../lib/forms";
import { useAuth } from "../../utils/AuthContext";

const Form = ({ form }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  if (!loading && !isAuthenticated) {
    router.replace(`/login?next=/form/${id}`);
  }
  return (
    <Container
      maxW={"80%"}
      shadow="xl"
      p={5}
      my={5}
      // rounded={"sm"}
      backgroundColor={useColorModeValue("white.50", "gray.700")}
    >
      <Heading my={3}>{form.title}</Heading>
      <hr />
      <Text my={1}>{form.customerCompanyName}</Text>
      <Text>{form.customerName}</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid my={3} columns={[1, null, 2]} spacing={5}>
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
};

export default Form;

export async function getStaticPaths() {
  let forms = await getForms();
  if (forms !== null) {
    let paths = forms.map((form: { id: any }) => {
      return {
        params: {
          id: form.id.toString(),
        },
      };
    });
    return {
      paths,
      fallback: false,
    };
  }
}

export async function getStaticProps({ params }) {
  let id = params.id;
  let form = await getForm(id);
  if (form !== null) {
    return {
      props: {
        form,
      },
    };
  }
}
