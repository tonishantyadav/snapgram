import {
  Box,
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

const UserProfileUpdateModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Button
        borderRadius="20px"
        _hover={{
          background: 'lightPurpleBg',
        }}
        onClick={onOpen}
      >
        Edit profile
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
          </ModalContent>
        </Modal>
      </Button>
    </Box>
  );
};

export default UserProfileUpdateModal;
