import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';
import { ProfileUpdateForm } from '@user/components';
import useUserStore from '@user/hooks/useUserStore';

const ProfileUpdateModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUserStore();
  const theme = useTheme();

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
            <ModalBody cursor="pointer">
              {user && <ProfileUpdateForm user={user} />}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Button>
    </Box>
  );
};

export default ProfileUpdateModal;
