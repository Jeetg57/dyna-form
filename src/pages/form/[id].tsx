import {
  Box,
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
import { PDFViewer } from "@react-pdf/renderer";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FormPdf } from "../../components/formPdf";
import { useAuth } from "../../utils/AuthContext";
import { useFormWithId } from "../../utils/formsFetcher";

const Form = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const { id } = router.query;
  if (!loading && !isAuthenticated) {
    router.replace(`/login?next=/form/${id}`);
  }
  const { register, handleSubmit } = useForm();
  const { form, isError, isLoading } = useFormWithId(id ? id.toString() : "-1");

  if (isError && !isLoading) {
    return (
      <Box color={useColorModeValue("white.50", "gray.700")}>{isError}</Box>
    );
  }
  const onSubmit = (data: any) => {
    console.log(data);
  };
  if (isLoading)
    <Box color={useColorModeValue("white.50", "gray.700")}>{isLoading}</Box>;
  if (form && !isLoading)
    return (
      <Container
        maxW={"80%"}
        shadow="xl"
        p={5}
        my={5}
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
        {/* <FormPdf form={form} /> */}
      </Container>
    );
};

export default Form;
