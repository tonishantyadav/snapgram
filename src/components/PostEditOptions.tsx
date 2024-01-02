import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { MdDelete, MdEdit } from 'react-icons/md';
import { PostUpdateForm } from '.';

const PostEditOptions = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const theme = useTheme();
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
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<MdEdit />}
                justifyContent="flex-start"
                _hover={{
                  background: 'lightPurpleBg',
                }}
                marginTop={2}
                onClick={onOpen}
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
                onClick={() => console.log('Delete')}
              >
                Delete
              </Button>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxW={{
            base: 'sm',
            md: 'lg',
            lg: 'xl',
          }}
          bg={theme.colors.gray[900]}
        >
          <ModalCloseButton />
          <ModalBody>
            <PostUpdateForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostEditOptions;
