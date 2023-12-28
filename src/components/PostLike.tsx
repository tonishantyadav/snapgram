import { HStack, Image } from '@chakra-ui/react';
import { useState } from 'react';

interface Props {
  postId: string;
  userId: string;
}

const PostLike = ({ postId, userId }: Props) => {
  const [isPostLiked, setIsPostLiked] = useState(false);

  return (
    <HStack gap={5}>
      <Image
        src={isPostLiked ? '/assets/icons/liked.svg' : '/assets/icons/like.svg'}
        width="20px"
        alt="liked"
        onClick={() => setIsPostLiked(!isPostLiked)}
      />
    </HStack>
  );
};

export default PostLike;
