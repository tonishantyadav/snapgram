import { Grid, GridItem, Heading, Show } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const userSession = localStorage.getItem('userSession');

  useEffect(() => {
    if (userSession) {
      if (!JSON.parse(userSession)) navigate('/signin');
    }
  }, [userSession, navigate]);

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
        <GridItem area="sidebar">
          <Heading>Hello Aside</Heading>
        </GridItem>
      </Show>
      <GridItem area="main"></GridItem>
    </Grid>
  );
};

export default HomePage;
