import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Box,
  Center,
} from '@chakra-ui/react';
import { HiDotsHorizontal } from 'react-icons/hi';

const PostEditOptions = () => {
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
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
      </PopoverTrigger>
      <PopoverContent outline="none">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PostEditOptions;
