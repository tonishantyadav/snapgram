import { Box } from '@chakra-ui/react';
import { Models } from 'appwrite';
import { PostCard, PostCardSkeleton } from '@post/components';
import usePostList from '@post/hooks/usePostList';

const PostGrid = () => {
  const { data: posts, isLoading, isError } = usePostList();

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  if (isError) return <p>Fetching post list failed!</p>;

  return (
    <Box>
      {isLoading &&
        skeletons.map((skeleton) => <PostCardSkeleton key={skeleton} />)}
      {posts &&
        posts?.map((post: Models.Document) => (
          <PostCard post={post} edit={false} key={post.$id} />
        ))}
    </Box>
  );
};

export default PostGrid;
