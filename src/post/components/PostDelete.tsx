import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import usePostDelete from '@post/hooks/usePostDelete';

const PostDelete = () => {
  const { id: postId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, handlePostDelete } = usePostDelete(postId ?? '', onClose);

  return (
    <Button
      variant="ghost"
      size="sm"
      leftIcon={<MdDelete />}
      justifyContent="flex-start"
      _hover={{
        background: 'red.500',
      }}
      onClick={onOpen}
    >
      Delete
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this post?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="whatsapp" onClick={handlePostDelete}>
              {isLoading ? <Spinner /> : 'Yes'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Button>
  );
};

export default PostDelete;
