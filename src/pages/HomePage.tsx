import { Heading } from '@chakra-ui/react';
import useUser from '../hooks/useUser';

const HomePage = () => {
  const { user, isAuthenticated } = useUser();

  return <>{isAuthenticated && <Heading>{user?.name}</Heading>}</>;
};

export default HomePage;
