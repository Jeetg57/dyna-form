import { Container, Heading, Skeleton } from "@chakra-ui/react";
import { useAuth } from "../utils/AuthContext";

const Index = () => {
  const { user, loading, isAuthenticated } = useAuth();
  return (
    <Container maxW="80%" my={6}>
      <Skeleton isLoaded={!loading}>
        <Heading>Welcome {user?.firstName}</Heading>
      </Skeleton>
    </Container>
  );
};

export default Index;
