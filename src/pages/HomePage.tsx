import { Button, Grid, GridItem, Heading, Show } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks';
import useSignout from '../hooks/useSignout';

const HomePage = () => {
  const { user, isAuthenticated } = useUser();
  const { handleSignout } = useSignout();
  const navigate = useNavigate();
  const userSession = localStorage.getItem('userSession');

  useEffect(() => {
    if (userSession === 'false') navigate('/signin');
  }, [userSession]);

  return (
    <Grid
      templateAreas={{
        base: `'main'`,
        md: `'sidebar main'`,
        lg: `'sidebar main'`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '400px 1fr',
      }}
    >
      <Show above="md">
        <GridItem area="sidebar" bg="red">
          <Heading>Hello Aside</Heading>
        </GridItem>
      </Show>
      <GridItem area="main">
        <Button onClick={handleSignout}>Logout</Button>
        {isAuthenticated ? <Heading>{user?.name}</Heading> : <></>}
      </GridItem>
    </Grid>
  );
};

export default HomePage;
