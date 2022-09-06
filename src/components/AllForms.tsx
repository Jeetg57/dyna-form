import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  SimpleGrid,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

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

interface AllFormsProps {}

export const AllForms: React.FC<AllFormsProps> = ({}) => {
  const { isLoading, error, data } = useQuery(["repoData"], () =>
    fetch("http://localhost:5000/form/", {}).then((res) => res.json())
  );
  if (isLoading) return <Box>Loading...</Box>;

  if (error instanceof Error)
    return (
      <Skeleton>
        <Box>An error has occurred: ${error.message}</Box>
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
    return data.map((form: Form) => {
      return (
        <Box key={form.id} shadow={"sm"} my={4} p={4} rounded={"md"}>
          <Link>
            <SimpleGrid columns={4} spacing={10}>
              <Text>{form.title}</Text>
              <Text>{form.customerName}</Text>
              <Text>{form.customerCompanyName}</Text>
              <Text>{form.formFields.length}</Text>
            </SimpleGrid>
          </Link>
        </Box>
      );
    });
  }
};
