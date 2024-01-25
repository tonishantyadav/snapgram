import logo from '@assets/logo.svg';
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
import { lgNavLinks } from '@constants/navigation';
import { Link, useLocation } from 'react-router-dom';
import useUserCache from '@user/hooks/useUserCache';

const LeftSideBar = () => {
  const { user } = useUserCache();
  const location = useLocation();

  return (
    <Flex direction="column" bg="none">
      <Box paddingY={6} paddingX={5} as={Link} to="/">
        <Image
          src={logo}
          alt="logo"
          width={{
            base: '100px',
            md: '150px',
            lg: '200px',
          }}
        />
      </Box>
      <VStack spacing={4} align="stretch" flex={1} paddingX={3}>
        {lgNavLinks.map((lgNavLink) => (
          <Button
            variant={
              location.pathname === '/'
                ? 'ghost'
                : location.pathname != lgNavLink.route
                ? 'ghost'
                : 'solid'
            }
            key={lgNavLink.route}
            as={Link}
            to={lgNavLink.route}
            borderRadius="20px"
            textAlign="left"
            justifyContent="flex-start"
            w="100%"
          >
            <HStack spacing={4} alignItems="center">
              <Image src={lgNavLink.imgURL} boxSize="20px" />
              <Text>{lgNavLink.label}</Text>
            </HStack>
          </Button>
        ))}
        <Button
          variant={
            location.pathname === `/profile/${user?.$id}` ? 'solid' : 'ghost'
          }
          as={Link}
          to={`/profile/${user?.$id}`}
          borderRadius="20px"
          w="100%"
          justifyContent="flex-start"
        >
          <HStack spacing={3} alignItems="center">
            <Avatar src={user?.image} size="xs" />
            <Text>Profile</Text>
          </HStack>
        </Button>
      </VStack>
      <VStack padding={3} spacing={3}>
        <Button
          as={Link}
          to="/create"
          variant="solid"
          w="100%"
          borderRadius="20px"
          bg="purpleBg"
          _hover={{
            bg: 'lightPurpleBg',
          }}
        >
          Post
        </Button>
      </VStack>
    </Flex>
  );
};

export default LeftSideBar;
