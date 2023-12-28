import { HStack, Image } from '@chakra-ui/react';
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
    <HStack gap={5}>
      <Image
        src={
          // Checks if the userId is included in the likes array
          likes.includes(userId)
            ? '/assets/icons/liked.svg'
            : '/assets/icons/like.svg'
        }
        width="20px"
        alt="liked"
        onClick={handleLike}
      />
    </HStack>
  );
};

export default PostLike;
