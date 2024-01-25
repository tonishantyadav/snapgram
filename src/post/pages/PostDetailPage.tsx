import {
  Box,
  Divider,
  Grid,
  GridItem,
  Show,
  SimpleGrid,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  PostCardSkeleton,
  PostCommentBox,
  PostDetailCard,
} from '@post/components';
import usePost from '@post/hooks/usePost';
import useUserStore from '@user/hooks/useUserStore';

const PostDetailPage = () => {
  const [edit, setEdit] = useState(false);
  const { id: postId } = useParams();
  const { user } = useUserStore();
  const { post, isLoading, isSuccess } = usePost(postId ?? '');

  useEffect(() => {
    if (post && isSuccess) {
      if (post.creator.$id === user?.$id) {
        setEdit(true);
      }
    }
  }, [post, user, isSuccess]);

  return (
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
      <GridItem area="leftDivider" height="100vh">
        <Divider orientation="vertical" />
      </GridItem>
      <GridItem area="main">
        <SimpleGrid
          templateRows={'1fr 1px 1fr'}
          maxH="100vh"
          overflowY="scroll"
          sx={{
            '::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
          }}
        >
          <Box width="100%">
            {isLoading && <PostCardSkeleton />}
            {isSuccess && user && (
              <PostDetailCard post={post} user={user} edit={edit} />
            )}
          </Box>
          <Box>
            <Divider />
          </Box>
          <Box>{isSuccess && <PostCommentBox post={post} />}</Box>
        </SimpleGrid>
      </GridItem>
      <GridItem area="rightDivider" height="100vh">
        <Divider orientation="vertical" />
      </GridItem>
      <Show above="md">
        <GridItem area="sidebar">{/* Render sidebar */}</GridItem>
      </Show>
    </Grid>
  );
};

export default PostDetailPage;
