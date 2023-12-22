import { Divider, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar, Sidebar } from '../components';

const Layout = () => {
  const location = useLocation();
  const showSidebar = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  if (showSidebar) {
    return (
      <>
        {location.pathname !== '/signin' && location.pathname !== '/signup' ? (
          <Grid
            templateAreas={{
              md: `'sidebar main'`,
              lg: `'sidebar main'`,
            }}
            templateColumns={{
              base: '1fr',
              md: '300px 1fr',
              lg: '350px 1fr',
            }}
          >
            <GridItem area="sidebar">
              <Sidebar />
            </GridItem>
            <GridItem area="main" h="100vh">
              <Divider orientation="vertical" />
            </GridItem>
            <GridItem area="main">
              <Outlet />
            </GridItem>
          </Grid>
        ) : (
          <Outlet />
        )}
      </>
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
