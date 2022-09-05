import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Link,
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    if (window.sessionStorage.getItem("jwt")) {
      router.push("/");
    }
  }
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  const onSubmitForm = (data: any) => {
    axios({
      method: "post",
      url: "http://localhost:5000/auth/signin",
      data: data,
    })
      .then(function (response: AxiosResponse) {
        if (response.data.access_token) {
          toast({
            title: "Successfully signed in.",
            //   description: response.data.access_token,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          sessionStorage.setItem("jwt", response.data.access_token);
          sessionStorage.setItem("expiry", response.data.expiresIn);

          router.push("/");
        } else {
          toast({
            title: "Error",
            description: "Can not sign in at the moment",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
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
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          {/* <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text> */}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" {...register("email")} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register("password")} />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default login;
