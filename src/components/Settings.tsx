import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';
import { FaBookmark, FaEdit } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { IoMdLogOut } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useSignout, useUserStore } from '../user';

const Settings = () => {
  const { user, isAuthenticated } = useUserStore();
  const { handleSignout } = useSignout();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const theme = useTheme();

  if (!user && !isAuthenticated) return null;

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
            <HStack>
              <Avatar name={user?.name} src={user?.image} />
              {isAuthenticated && (
                <Flex direction="column" padding={2}>
                  <Heading size="sm">{user?.name}</Heading>
                  <Text fontSize="small" color="gray">
                    @{user?.username}
                  </Text>
                </Flex>
              )}
            </HStack>
          </DrawerHeader>
          <Divider />
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Box h="40px">
                <Button variant="link">
                  <HStack>
                    <FaEdit />
                    <Link to="/profile">Edit profile</Link>
                  </HStack>
                </Button>
              </Box>
              <Box h="40px">
                <Button variant="link">
                  <HStack>
                    <FaBookmark />
                    <Link to="/save-posts">Save posts</Link>
                  </HStack>
                </Button>
              </Box>
            </VStack>
            <Flex direction="column">
              <Button colorScheme="red" variant="solid" onClick={handleSignout}>
                <HStack>
                  <IoMdLogOut />
                  <Text>Logout</Text>
                </HStack>
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Settings;
