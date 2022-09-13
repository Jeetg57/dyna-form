import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Skeleton,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { useAuth } from "../utils/AuthContext";
import { DarkModeSwitch } from "./DarkModeSwitch";

const Links = [
  { label: "Dashboard", value: "/", auth: false },
  { label: "Forms", value: "/forms", auth: true },
  { label: "New Form", value: "/form/create", auth: true },
];

const NavLink = ({ url, children }: { url: string; children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={url}
  >
    {children}
  </Link>
);
export const NavBar = () => {
  const { user, logout, loading } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Skeleton isLoaded={!loading}>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => {
                if (link.auth && user) {
                  return (
                    <NavLink url={link.value} key={link.label}>
                      {link.label}
                    </NavLink>
                  );
                } else if (!link.auth)
                  return (
                    <NavLink url={link.value} key={link.label}>
                      {link.label}
                    </NavLink>
                  );
              })}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {!user && (
              <NavLink url="/login" key={"login"}>
                Login
              </NavLink>
            )}
            {user && (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    name={user.firstName + " " + user.lastName}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>{user.firstName + " " + user.lastName}</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </MenuItem>
                  <MenuDivider />
                  <Box display={"flex"} justifyContent="end" mr={3}>
                    <DarkModeSwitch />
                  </Box>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink url={link.value} key={link.label}>
                  {link.label}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Skeleton>
  );
};
