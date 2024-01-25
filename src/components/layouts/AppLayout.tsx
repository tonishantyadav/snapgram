import { useBreakpointValue } from '@chakra-ui/react';
import { LargeLayout, SmallLayout } from '@components/layouts';
import { Outlet, useLocation } from 'react-router-dom';

const AppLayout = () => {
  const location = useLocation();
  const showSidebar = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

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
