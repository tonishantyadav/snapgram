import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Models } from 'appwrite';
import { ProfileUpdateModal } from '@user/components';
import useSignout from '@user/hooks/useSignout';
import useUserStore from '@user/hooks/useUserStore';

interface Props {
  user: Models.Document;
}

const SignoutButton = () => {
  const { isLoading, handleSignout } = useSignout();
  return (
    <Box>
      <Button
        variant="outline"
        borderRadius="20px"
        _hover={{
          background: 'red.500',
        }}
        onClick={handleSignout}
      >
        {isLoading ? <Spinner /> : 'Logout'}
      </Button>
    </Box>
  );
};

const LargeHeader = ({ user }: Props) => {
  return (
    <Box paddingX={8} paddingY={10}>
      <HStack justifyContent="center" gap={20}>
        <Box>
          <Avatar
            size={{
              md: 'xl',
              lg: '2xl',
            }}
            src={user.image}
          />
        </Box>
        <Flex direction="column" rowGap={3}>
          <HStack gap={8}>
            <Text fontWeight="semibold">@{user.username}</Text>
            <HStack>
              <ProfileUpdateModal />
              <SignoutButton />
            </HStack>
          </HStack>
          <HStack gap={4}>
            <HStack>
              <strong>0</strong>
              <Text>posts</Text>
            </HStack>
            <HStack>
              <strong>95</strong>
              <Text>followers</Text>
            </HStack>
            <HStack>
              <strong>100</strong>
              <Text>following</Text>
            </HStack>
          </HStack>
          <Text fontWeight="semibold">{user.name}</Text>
          <Box maxW="500px">
            <Text>{user.bio}</Text>
          </Box>
        </Flex>
      </HStack>
    </Box>
  );
};

const SmallHeader = ({ user }: Props) => {
  return (
    <Box paddingX={4} paddingY={8}>
      <Flex gap={5}>
        <VStack rowGap={3}>
          <Box>
            <Avatar size="lg" src={user.image} />
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="semibold">
              {user.name}
            </Text>
          </Box>
        </VStack>
        <Flex direction="column" gap={3}>
          <Box paddingStart={1}>
            <Text fontSize="sm" fontWeight="semibold" paddingStart={1}>
              @{user.username}
            </Text>
          </Box>
          <Box>
            <HStack>
              <ProfileUpdateModal />
              <SignoutButton />
            </HStack>
          </Box>
          <Box paddingStart={1}>
            <Text fontSize="sm">{user.bio}</Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

const UserProfilePage = () => {
  const { user } = useUserStore();
  const isLarge = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  return (
    <Grid
      templateAreas={{
        base: `'main'`,
        md: `'divider main'`,
        lg: `'divider main'`,
      }}
      templateColumns={{
        base: '1fr',
        md: '1px 1fr',
      }}
    >
      <GridItem area="divider" height="100vh">
        <Divider orientation="vertical" />
      </GridItem>
      <GridItem area="main">
        <SimpleGrid row={3} cursor="pointer">
          <Box>
            {isLarge ? (
              <Box display={{ base: 'nome', md: 'block', lg: 'block' }}>
                {user && <LargeHeader user={user} />}
              </Box>
            ) : (
              <Box display={{ base: 'block', md: 'none', lg: 'none' }}>
                {user && <SmallHeader user={user} />}
              </Box>
            )}
          </Box>
          <Center>
            <Divider width="90%" />
          </Center>
        </SimpleGrid>
      </GridItem>
    </Grid>
  );
};

export default UserProfilePage;
