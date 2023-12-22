import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Layout = () => {
  const location = useLocation();
  const showSidebar = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  if (showSidebar) {
    return (
      <Grid
        templateAreas={{
          md: `'sidebar main'`,
          lg: `'sidebar main'`,
        }}
        templateColumns={{
          base: '1fr',
          md: '400px 1fr',
          lg: '400px 1fr',
        }}
      >
        <GridItem area="sidebar">
          <Sidebar />
        </GridItem>
        <GridItem area="main">
          <Outlet />
        </GridItem>
      </Grid>
    );
  } else {
    return (
      <>
        {location.pathname === '/' && <Navbar />}
        <Outlet />
      </>
    );
  }
};

export default Layout;
