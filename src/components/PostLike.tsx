import { Box, Image, Center } from '@chakra-ui/react';
import { Models } from 'appwrite';
import { useState } from 'react';
import { usePostLike } from '../hooks';

interface Props {
  post: Models.Document;
  userId: string;
}

const PostLike = ({ post, userId }: Props) => {
  const postLikes = post.like.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState<string[]>(postLikes);
  const { handlePostLike } = usePostLike();

  /**
   * Handles toggling the like state for the post.
   *
   * Updates the local likes state and calls handlePostLike
   * to update the likes on the server.
   */
  const handleLike = () => {
    let newLikes = [...likes];
    if (newLikes.includes(userId)) {
      newLikes = newLikes.filter((like) => like !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    handlePostLike({ postId: post.$id, likes: newLikes });
  };

  return (
    <Box
      display="flex"
      borderRadius="50%"
      _hover={{
        cursor: 'pointer',
        backgroundColor: 'gray.700',
      }}
      boxSize="40px"
      justifyContent="center"
      alignItems="center"
    >
      <Image
        src={
          // Checks if the userId is included in the likes array
          likes.includes(userId)
            ? '/assets/icons/liked.svg'
            : '/assets/icons/like.svg'
        }
        alt="like"
        onClick={handleLike}
        width={likes.includes(userId) ? '23px' : '20px'}
      />
    </Box>
  );
};

export default PostLike;
