import { Box, Grid, GridItem } from '@chakra-ui/react';
import { LeftSideBar } from '@pages/home';
import { Outlet } from 'react-router-dom';

const LargeLayout = () => {
  return (
    <Grid
      templateAreas={{
        md: `'leftSideBar main'`,
        lg: `'leftSideBar main'`,
      }}
      templateColumns={{
        base: '1fr',
        md: '200px 1fr',
        lg: '300px 1fr',
      }}
    >
      <GridItem
        area="leftSideBar"
        position="fixed"
        width={{
          md: '200px',
          lg: '300px',
        }}
      >
        <LeftSideBar />
      </GridItem>
      <GridItem area="main">
        <Box>
          <Outlet />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default LargeLayout;
