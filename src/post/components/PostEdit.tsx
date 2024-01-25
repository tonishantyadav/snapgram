import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';
import { PostUpdateForm } from '@post/components';

const PostEdit = () => {
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxW={{
            base: 'sm',
            md: 'lg',
            lg: 'xl',
          }}
          bg={theme.colors.gray[900]}
          boxShadow="none"
        >
          <ModalCloseButton />
          <ModalBody>
            <PostUpdateForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Button>
  );
};

export default PostEdit;
