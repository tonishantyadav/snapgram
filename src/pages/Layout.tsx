import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Sidebar } from '../components';
import { useEffect } from 'react';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const showSidebar = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  useEffect(() => {
    if (!localStorage.getItem('userSession')) navigate('/signin');
  }, [navigate]);

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
              md: '200px 1fr',
              lg: '300px 1fr',
            }}
          >
            <GridItem area="sidebar">
              <Sidebar />
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
