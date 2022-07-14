import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface FormBlueprintProps {}
interface DynaFormBlueprint {
  Description: string;
  FieldName: string;
  Type: string;
}
export const FormBlueprint: React.FC<FormBlueprintProps> = ({}) => {
  const [formValues, setFormValues] = useState([]);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: DynaFormBlueprint) => {
    setFormValues((formValues) => [...formValues, data]);
  };
  const RemoveItem = (index: number) => {
    console.log(index);
    let items = [...formValues];
    items.splice(index, 1);
    setFormValues(items);
  };

  return (
    <Box>
      <Heading mt={"1em"}>Dyna Form</Heading>

      <Box p={5} shadow="md" m={5}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex>
            <FormControl isRequired mr={3}>
              <FormLabel>Field Name</FormLabel>
              <Input placeholder="Field Name" {...register("FieldName")} />
            </FormControl>
            <FormControl isRequired ml={3}>
              <FormLabel htmlFor="first-name">Type</FormLabel>
              <Select placeholder="Select option" {...register("Type")}>
                <option value={"file"}>File Upload</option>
                <option value={"text"}>Text</option>
              </Select>
            </FormControl>
          </Flex>
          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea {...register("Description")} placeholder="Description" />
          </FormControl>
          <Button type="submit">Add</Button>
        </form>
      </Box>
      <hr />
      {formValues.length > 0 && (
        <Box>
          <Heading>Dyna Table</Heading>
          <TableContainer whiteSpace="pre-wrap">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Field Name</Th>
                  <Th>Description</Th>
                  <Th>Type</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {formValues.map((value: DynaFormBlueprint, Index) => {
                  return (
                    <Tr>
                      <Td>{Index + 1}</Td>
                      <Td>{value.FieldName}</Td>
                      <Td>{value.Description}</Td>
                      <Td>
                        {value.Type == "file" ? "File Upload" : "Text Input"}
                      </Td>
                      <Td>
                        <Button
                          colorScheme="red"
                          onClick={() => RemoveItem(Index)}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {formValues.length > 0 && (
        <Box>
          <Heading mb={3}>Form Output</Heading>
          <Box shadow={"md"} px={7} mx={4} rounded="sm">
            <form>
              {formValues.map((value: DynaFormBlueprint, Index) => {
                return (
                  <FormControl isRequired pb={7}>
                    <FormLabel>{value.FieldName}</FormLabel>
                    <Input type={value.Type} placeholder={value.FieldName} />
                  </FormControl>
                );
              })}
            </form>
          </Box>
        </Box>
      )}
    </Box>
  );
};
