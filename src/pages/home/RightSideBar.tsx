import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { TopCreators } from '@pages/home';

const RightSideBar = () => {
  return (
    <SimpleGrid>
      <Box paddingY={6}>
        <Heading
          textAlign="center"
          size={{
            base: 'sm',
            md: 'md',
            lg: 'lg',
          }}
        >
          Top Creators
        </Heading>
      </Box>
      <Box>
        <TopCreators />
      </Box>
    </SimpleGrid>
  );
};

export default RightSideBar;
