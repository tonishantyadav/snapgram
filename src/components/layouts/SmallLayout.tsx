import { Box, Flex } from '@chakra-ui/react';
import { BottomBar, TopBar } from '@pages/home';
import { Outlet } from 'react-router-dom';

const SmallLayout = () => {
  return (
    <Flex direction="column" height="100vh">
      <Box>
        <TopBar />
      </Box>
      <Box flex="1" overflowY="auto">
        <Outlet />
      </Box>
      <Box>
        <BottomBar />
      </Box>
    </Flex>
  );
};

export default SmallLayout;