import { Box, Image } from '@chakra-ui/react';
import { Models } from 'appwrite';
import { useState } from 'react';
import { usePostLike } from '..';
import { useUser } from '../../user';

interface Props {
  post: Models.Document;
}

const PostLike = ({ post }: Props) => {
  const postLikes = post.like.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(postLikes);
  const { user } = useUser();
  const { handlePostLike } = usePostLike();

  const handleLike = () => {
    let newLikes = [...likes];
    if (newLikes.includes(user.$id)) {
      newLikes = newLikes.filter((like) => like !== user.$id);
    } else {
      newLikes.push(user.$id);
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
          likes.includes(user.$id)
            ? '/assets/icons/liked.svg'
            : '/assets/icons/like.svg'
        }
        alt="like"
        onClick={handleLike}
        width={likes.includes(user.$id) ? '23px' : '20px'}
      />
    </Box>
  );
};

export default PostLike;
