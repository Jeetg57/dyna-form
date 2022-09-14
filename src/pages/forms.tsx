import { Container } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Link,
  SimpleGrid,
  Skeleton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForms } from "../utils/formsFetcher";
export interface FormField {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  dataType: string;
  data: string;
  approved: boolean;
  remarks: string;
  formId: number;
}

export interface Form {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  customerName: string;
  customerCompanyName: string;
  formFields: FormField[];
}
const forms = () => {
  const router = useRouter();
  // const { isLoading, error, data } = useQuery(["repoData"], () =>
  //   fetch("http://localhost:5000/form/", {}).then((res) => res.json())
  // );

  const { data, isLoading, isError } = useForms();

  if (isLoading) return <Box>Loading...</Box>;

  if (isError instanceof Error)
    return (
      <Skeleton>
        <Box>An error has occurred: ${isError.message}</Box>
      </Skeleton>
    );

  if (data) {
    if (data.length == 0) {
      return (
        <Box>
          <Heading>No Forms Available at the moment</Heading>
        </Box>
      );
    }
    return (
      <Container maxW={"80%"} my={3}>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Customer Name</Th>
                <Th>Company Name</Th>
                <Th>Fields</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((form: Form) => {
                return (
                  <Tr key={form.id}>
                    <Td>{form.title}</Td>
                    <Td>{form.customerName}</Td>
                    <Td>{form.customerCompanyName}</Td>
                    <Td>{form.formFields.length}</Td>
                    <Td>
                      <IconButton
                        variant="solid"
                        colorScheme="gray"
                        isRound={true}
                        aria-label="Send email"
                        onClick={() => router.push(`/form/${form.id}`)}
                        icon={<EditIcon />}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
};

export default forms;
