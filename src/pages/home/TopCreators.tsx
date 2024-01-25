import {
  Avatar,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useTopCreators } from '@pages/home';
import { Models } from 'appwrite';

const TopCreators = () => {
  const { data: creators, isLoading, isError } = useTopCreators();

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (isError) {
    return <Text>Failed to display the top creators</Text>;
  }

  return (
    <SimpleGrid
      columns={{ md: 1, lg: 2, xl: 2 }}
      spacing={2}
      paddingX={2}
      cursor="pointer"
    >
      {creators?.map((creator: Models.Document, index: number) => (
        <Card
          key={index}
          borderRadius="10px"
          variant="outline"
          transition="transform 0.2s ease-in-out"
          _hover={{
            transform: 'scale(1.05)',
          }}
          size={{
            md: 'sm',
          }}
        >
          <CardBody>
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
              rowGap={2}
            >
              <Avatar
                src={creator.image}
                size={{
                  md: 'md',
                  lg: 'lg',
                }}
              />
              <Text fontWeight="semibold" color="gray.500" fontSize="sm">
                @{creator.username}
              </Text>
              <Button
                borderRadius="20px"
                bg="purpleBg"
                size={{
                  md: 'xs',
                  lg: 'sm',
                }}
                _hover={{
                  background: 'lightPurpleBg',
                }}
              >
                Follow
              </Button>
            </Flex>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default TopCreators;
