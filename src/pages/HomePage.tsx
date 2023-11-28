import { Heading } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();

  return <>{isAuthenticated && <Heading>{user?.name}</Heading>}</>;
};

export default HomePage;
