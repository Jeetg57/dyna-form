import { Container, Heading, Skeleton } from "@chakra-ui/react";
import { Dashboard } from "../components/Dashboard";
import { useAuth } from "../utils/AuthContext";

const Index = () => {
  const { user, loading, isAuthenticated } = useAuth();
  if (loading) {
    return;
  }
  if (isAuthenticated && !loading) {
  } else {
    return <Dashboard />;
  }
};

export default Index;
