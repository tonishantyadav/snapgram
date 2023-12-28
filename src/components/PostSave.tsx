import { Image } from '@chakra-ui/react';
import { useState } from 'react';

interface Props {
  postId: string;
  userId: string;
}

const PostSave = ({ postId, userId }: Props) => {
  const [isPostSaved, setIsPostSaved] = useState(false);

  return (
    <Image
      src={isPostSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'}
      width="20px"
      alt="saved"
      onClick={() => setIsPostSaved(!isPostSaved)}
    />
  );
};

export default PostSave;
