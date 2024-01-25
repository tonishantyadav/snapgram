import { useBreakpointValue } from '@chakra-ui/react';
import { LargeLayout, SmallLayout } from '@components/layouts';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const AppLayout = () => {
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

  return (
    <>
      {location.pathname !== '/signin' && location.pathname !== '/signup' ? (
        showSidebar ? (
          <LargeLayout />
        ) : (
          <SmallLayout />
        )
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default AppLayout;
