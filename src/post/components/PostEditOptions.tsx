import {
  Box,
  Button,
  Center,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
} from '@chakra-ui/react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { PostDelete, PostEdit } from '@post/components';

const PostEditOptions = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button bg="none" variant="unstyled">
            <Center>
              <Box
                display="flex"
                _hover={{
                  cursor: 'pointer',
                  background: 'gray.700',
                }}
                boxSize="35px"
                borderRadius="50%"
                justifyContent="center"
                alignItems="center"
              >
                <HiDotsHorizontal />
              </Box>
            </Center>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          outline="none"
          borderRadius="20px"
          boxSize="110px"
          width="200px"
          justifyContent="center"
          marginTop={2}
          marginEnd={2}
        >
          <PopoverBody>
            <VStack spacing={2} align="stretch">
              <PostEdit />
              <PostDelete />
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PostEditOptions;
