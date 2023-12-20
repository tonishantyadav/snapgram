import {
  Avatar,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';
import { FaGear } from 'react-icons/fa6';

const Settings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const theme = useTheme();

  return (
    <>
      <Button variant="ghost" borderRadius="50%" padding={2} onClick={onOpen}>
        <FaGear size="1.5rem" />
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          height="75vh"
          borderBottomLeftRadius={10}
          bg={theme.colors.gray[800]}
        >
          <DrawerCloseButton />
          <DrawerHeader>
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          </DrawerHeader>
          <Divider />
          <DrawerBody>
            <Heading>Your Profile</Heading>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Settings;
