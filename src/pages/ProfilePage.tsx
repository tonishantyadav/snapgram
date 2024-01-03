import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { User } from '../types';
import { useUser } from '../hooks';
import { SignoutButton } from '../components';

interface Props {
  user: User | null;
}

const LargeDeviceHeader = ({ user }: Props) => {
  if (!user) return null;

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
              <Button
                borderRadius="20px"
                _hover={{
                  background: 'lightPurpleBg',
                }}
              >
                Edit profile
              </Button>
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
            <Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. A iusto
              eos voluptate. Quam dolore laudantium repellendus quidem neque
              tempora optio.
            </Text>
          </Box>
        </Flex>
      </HStack>
    </Box>
  );
};

const SmallDeviceHeader = ({ user }: Props) => {
  if (!user) return null;

  return (
    <Box paddingX={4} paddingY={8}>
      <Flex>
        <VStack rowGap={4}>
          <Box>
            <Avatar size="lg" />
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="semibold" paddingStart={2}>
              {user.name}
            </Text>
          </Box>
        </VStack>
        <Flex direction="column" gap={2}>
          <Box>
            <Text fontSize="sm" fontWeight="semibold" paddingStart={1}>
              @{user.username}
            </Text>
          </Box>
          <Box>
            <ButtonGroup size="sm">
              <Button
                borderRadius="20px"
                _hover={{
                  background: 'lightPurpleBg',
                }}
              >
                Edit profile
              </Button>
              <Button borderRadius="20px">Archive</Button>
            </ButtonGroup>
          </Box>
        </Flex>
        <Box maxW="500px">
          <Text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. A iusto
            eos voluptate. Quam dolore laudantium repellendus quidem neque
            tempora optio.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

const ProfilePage = () => {
  const { user } = useUser();
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
          {isLarge ? (
            <LargeDeviceHeader user={user} />
          ) : (
            <SmallDeviceHeader user={user} />
          )}
          <Center>
            <Divider width="90%" />
          </Center>
        </SimpleGrid>
      </GridItem>
    </Grid>
  );
};

export default ProfilePage;
