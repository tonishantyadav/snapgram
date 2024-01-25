import {
  Card,
  Center,
  Image,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { ExplorePosts } from '@pages/explore';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';

interface Props {
  explorePosts: ExplorePosts;
}

const ExploreGrid = ({ explorePosts }: Props) => {
  const posts = explorePosts.posts;

  if (explorePosts.isLoading)
    return (
      <Center pt={5}>
        <Spinner />
      </Center>
    );

  if (explorePosts.isError) return <Text>Failed to show the posts</Text>;

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      spacing={5}
      padding={5}
      cursor="pointer"
    >
      {posts?.map((post: Models.Document, index: any) => (
        <Card
          key={index}
          as={Link}
          to={`/post/${post.$id}`}
          borderRadius={10}
          overflow="hidden"
          boxShadow="md"
          transition="transform 0.2s ease-in-out"
          _hover={{
            transform: 'scale(1.05)',
          }}
        >
          <Image
            src={post.image}
            objectFit="cover"
            boxSize="100%"
            borderTopRadius="10"
          />
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default ExploreGrid;
