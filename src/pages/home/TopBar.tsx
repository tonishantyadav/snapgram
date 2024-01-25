import { Box, Divider, HStack, Image } from '@chakra-ui/react';

const TopBar = () => {
  return (
    <>
      <Box>
        <HStack paddingY={5} justify="center">
          <Image src="/assets/logo.svg" alt="logo" />
        </HStack>
        <Divider />
      </Box>
    </>
  );
};

export default TopBar;
