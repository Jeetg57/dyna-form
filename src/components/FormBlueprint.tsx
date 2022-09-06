import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import api from "../utils/api";
import { useAuth } from "../utils/AuthContext";

interface FormBlueprintProps {}
interface DynaFormFieldsBlueprint {
  description: string;
  title: string;
  dataType: string;
  data: string;
  approved: boolean;
  remarks: string;
}
interface DynaFormBlueprint {
  formTitle: string;
  customerName: string;
  customerCompanyName: string;
  assignedTo: number;
}
export const FormBlueprint: React.FC<FormBlueprintProps> = ({}) => {
  const router = useRouter();
  const { isAuthenticated, loading, user } = useAuth();
  if (isAuthenticated && !loading) {
    const [formValues, setFormValues] = useState([]);
    const toast = useToast();
    const [form, setForm] = useState();
    const [assignee, setAssignee] = useState([]);
    const getAssignees = async () => {
      const assignees = await api.get("/form/assignees");
      if (assignees.data) {
        assignees.data.map((assigneeItem) => {
          let assigneeSelect = {
            value: assigneeItem.id,
            label:
              assigneeItem.id +
              " - " +
              assigneeItem.firstName +
              " " +
              assigneeItem.lastName,
          };
          setAssignee((assignee) => [...assignee, assigneeSelect]);
        });
      }
    };
    const { register, handleSubmit } = useForm();
    const {
      control,
      register: registerForm,
      handleSubmit: handleSubmit2,
    } = useForm();
    const formFieldExists = (formValues, data: DynaFormFieldsBlueprint) => {
      let exists = false;
      formValues.forEach((value: { title: string }) => {
        if (value.title === data.title) {
          exists = true;
        }
      });
      return exists;
    };
    const onSubmit = (data: DynaFormFieldsBlueprint) => {
      console.log(formValues);
      const exists = formFieldExists(formValues, data);
      console.log(exists);
      if (!exists) {
        setFormValues((formValues) => [...formValues, { ...data }]);
      } else {
        toast({
          title: "Error",
          description: `This Key [${data.title}] has already been used.`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };
    const onSubmitForm = (data: DynaFormBlueprint) => {
      data.assignedTo = data.assignedTo["value"];
      let obj = {
        ...data,
        formFields: { ...formValues },
      };
      console.log(obj);
      axios({
        method: "post",
        url: "http://localhost:5000/form",
        data: obj,
      })
        .then(function () {
          toast({
            title: "Form created.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch(function (err: AxiosError) {
          toast({
            title: err.response.data["error"],
            description: err.response.data["description"],
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          console.log(err.response);
        });
      // axios
      //   .post("http://localhost:5000/form")
      //   .then(function (response) {
      //     console.log(response.data);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    };

    const RemoveItem = (index: number) => {
      console.log(index);
      let items = [...formValues];
      items.splice(index, 1);
      setFormValues(items);
    };
    useEffect(() => {
      setAssignee([]);
      getAssignees();
    }, []);

    return (
      <Box>
        <Box p={5} shadow="md" m={5}>
          <Heading my={2}>
            Dyna Form - {user.firstName} {user.lastName}
          </Heading>
          <hr />
          <form onSubmit={handleSubmit2(onSubmitForm)}>
            <Flex my={2}>
              <FormControl isRequired mr={3}>
                <FormLabel>Form Title</FormLabel>
                <Input
                  placeholder="Form Title"
                  {...registerForm("formTitle")}
                />
              </FormControl>
              <FormControl isRequired mr={3}>
                <FormLabel>Customer Name</FormLabel>
                <Input
                  placeholder="Customer Name"
                  {...registerForm("customerName")}
                />
              </FormControl>
              <FormControl isRequired mr={3}>
                <FormLabel>Company Name</FormLabel>
                <Input
                  placeholder="Company Name"
                  {...registerForm("customerCompanyName")}
                />
              </FormControl>
              <FormControl isRequired mr={3}>
                <FormLabel>Assignee</FormLabel>
                <Controller
                  name="assignedTo"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect {...field} options={assignee} />
                  )}
                />
              </FormControl>
              <Box display={"flex"} alignItems={"end"}>
                <Button type="submit">Submit</Button>
              </Box>
            </Flex>
          </form>
          <Box mt={3}>
            <Text fontSize={"lg"} fontWeight={"bold"}>
              Define form fields
            </Text>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex>
              <FormControl isRequired mr={3}>
                <FormLabel>Field Name</FormLabel>
                <Input placeholder="Field Name" {...register("title")} />
              </FormControl>
              <FormControl isRequired ml={3}>
                <FormLabel htmlFor="first-name">Type</FormLabel>
                <Select placeholder="Select option" {...register("dataType")}>
                  <option value={"file"}>File Upload</option>
                  <option value={"text"}>Text</option>
                </Select>
              </FormControl>
            </Flex>
            <FormControl isRequired mb={4}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                {...register("description")}
                placeholder="Description"
              />
            </FormControl>
            <Box display={"flex"} justifyContent={"end"} alignItems={"end"}>
              <IconButton
                colorScheme="blue"
                aria-label="Add Form Field"
                fontSize="20px"
                type="submit"
                icon={<AddIcon />}
              />
            </Box>
          </form>
        </Box>
        <hr />
        {formValues.length > 0 && (
          <Box m={5}>
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
                  {formValues.map((value: DynaFormFieldsBlueprint, Index) => {
                    return (
                      <Tr>
                        <Td>{Index + 1}</Td>
                        <Td>{value.title}</Td>
                        <Td>{value.description}</Td>
                        <Td>
                          {value.dataType == "file"
                            ? "File Upload"
                            : "Text Input"}
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
          <Box m={5}>
            <Heading mb={3}>Form Output</Heading>
            <Box>
              <Heading>{form}</Heading>
            </Box>
            <Box shadow={"md"} px={7} mx={4} rounded="sm">
              <form>
                {formValues.map((value: DynaFormFieldsBlueprint, Index) => {
                  return (
                    <FormControl isRequired pb={7}>
                      <FormLabel>{value.title}</FormLabel>
                      <Input type={value.dataType} placeholder={value.title} />
                    </FormControl>
                  );
                })}
              </form>
            </Box>
          </Box>
        )}
      </Box>
    );
  } else if (!isAuthenticated && !loading) {
    router.push("/login?next=/form/create");
    return;
  } else {
    return <Box>Loading...</Box>;
  }
};
