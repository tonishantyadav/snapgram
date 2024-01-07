import {
  Box,
  Divider,
  Grid,
  GridItem,
  HStack,
  Show,
  SimpleGrid,
} from '@chakra-ui/react';
import { Models } from 'appwrite';
import { PostCard, PostCardSkeleton, usePostList } from '../post';

const HomePage = () => {
  const { posts, isLoading, isError } = usePostList();

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  if (isError) return <p>Fetching post list failed!</p>;

  return (
    <>
      <Grid
        templateAreas={{
          base: `'main main'`,
          md: `'leftDivider main rightDivider sidebar'`,
          lg: `'leftDivider main rightDivider sidebar'`,
        }}
        templateColumns={{
          base: '1fr',
          md: '1px 1fr 1px 200px',
          lg: '1px 1fr 1px 300px',
          xl: '1px 1fr 1px 400px',
        }}
      >
        <GridItem area="leftDivider" height="100%">
          <Divider orientation="vertical" />
        </GridItem>
        <GridItem area="main">
          <SimpleGrid templateRows="90px 1px 1fr" gap={5} maxH="100vh">
            <Box
              paddingY={6}
              paddingX={5}
              width="100%"
              overflowX="scroll"
              sx={{
                '::-webkit-scrollbar': {
                  display: 'none', // For Chrome
                },
                scrollbarWidth: 'none', // For Firefox
              }}
            >
              <HStack cursor="pointer">
                {/* Render avatars  */}
                {/* <Avatar
                  _hover={{
                    background: 'gray',
                  }}
                  onClick={() => console.log('clicked')}
                /> */}
              </HStack>
            </Box>
            <Box>
              <Divider />
            </Box>
            <Box
              width="100%"
              overflowY="scroll"
              sx={{
                '::-webkit-scrollbar': {
                  display: 'none',
                },
                scrollbarWidth: 'none',
              }}
            >
              {isLoading &&
                skeletons.map((skeleton) => (
                  <PostCardSkeleton key={skeleton} />
                ))}
              {posts &&
                posts?.map((post: Models.Document) => (
                  <PostCard post={post} edit={false} key={post.$id} />
                ))}
            </Box>
          </SimpleGrid>
        </GridItem>
        <GridItem area="rightDivider" height="100%">
          <Divider orientation="vertical" />
        </GridItem>
        <Show above="md">
          <GridItem area="sidebar">{/* Render sidebar */}</GridItem>
        </Show>
      </Grid>
    </>
  );
};

export default HomePage;
