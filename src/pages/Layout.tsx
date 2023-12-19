import { Hide } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div>
      {path !== '/signup' && path !== '/signin' && (
        <Hide above="sm">
          <Navbar />
        </Hide>
      )}
      <Outlet />
    </div>
  );
};

export default Layout;
