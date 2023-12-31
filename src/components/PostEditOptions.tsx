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
import { MdDelete, MdEdit } from 'react-icons/md';

const PostEditOptions = () => {
  return (
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
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<MdEdit />}
              justifyContent="flex-start"
              _hover={{
                background: 'lightPurpleBg',
              }}
              marginTop={2}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<MdDelete />}
              justifyContent="flex-start"
              _hover={{
                background: 'red.500',
              }}
            >
              Delete
            </Button>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PostEditOptions;
