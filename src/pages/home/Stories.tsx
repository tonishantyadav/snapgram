import { Avatar, Flex, HStack } from '@chakra-ui/react';
import { stories } from '@constants/stories';

const Stories = () => {
  return (
    <Flex
      overflowX="auto"
      sx={{
        '::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
      }}
      padding={2}
      align="center"
    >
      <HStack spacing={4} shouldWrapChildren>
        {stories.map((s) => (
          <Avatar
            key={s.id}
            bg="none"
            size="lg"
            borderWidth="3px"
            borderColor="lightPurpleBg"
            src={s.image}
            objectFit="cover"
            _hover={{ cursor: 'pointer', opacity: 0.8 }}
          />
        ))}
      </HStack>
    </Flex>
  );
};

export default Stories;
