import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaGear } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { sidebarLinks } from '../constants';
import { useUser } from '../hooks';

const Sidebar = () => {
  const { user, isAuthenticated } = useUser();
  if (!user && !isAuthenticated) return null;

  console.log(user);

  return (
    <>
      <Flex direction="column">
        <Box paddingY={6} paddingLeft={5}>
          <Image src="/assets/logo.svg" alt="logo" width="250px" />
        </Box>
        <Box flex={1} paddingY={2} paddingLeft={3}>
          <VStack spacing={4} align="stretch">
            {sidebarLinks.map((sideBarLink) => (
              <Box h="40px" key={sideBarLink.route}>
                <Button variant="ghost" colorScheme="purple">
                  <HStack gap={3}>
                    <Image src={sideBarLink.imgURL} />
                    <Link to={sideBarLink.route}>{sideBarLink.label}</Link>
                  </HStack>
                </Button>
              </Box>
            ))}
          </VStack>
        </Box>
      </Flex>
      <Flex direction="column" padding={5} gap={4}>
        <Box>
          <Button
            bg="purpleBg"
            width="100%"
            borderRadius="50px"
            _hover={{ backgroundColor: 'lightPurpleBg' }}
          >
            <Text>Post</Text>
          </Button>
        </Box>
        <Box>
          <Link to={`/profile/${user?.id}`}>
            <Button
              variant="ghost"
              width="100%"
              height="60px"
              borderRadius="50px"
            >
              <HStack>
                <Avatar name={user?.name} src={user?.image} size="sm" />
                <Flex direction="column" rowGap={1} paddingLeft={1}>
                  <Text fontSize="md">{user?.name}</Text>
                  <Text fontSize="sm" color="gray">
                    @{user?.username}
                  </Text>
                </Flex>
                <Box paddingLeft={2}>
                  <FaGear size="1.2rem" />
                </Box>
              </HStack>
            </Button>
          </Link>
        </Box>
      </Flex>
    </>
  );
};

export default Sidebar;
