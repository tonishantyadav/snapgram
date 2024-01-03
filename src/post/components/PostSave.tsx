import { Box, Image } from '@chakra-ui/react';
import { Models } from 'appwrite';
import { useEffect, useState } from 'react';
import { usePostSave, usePostUnsave } from '..';
import { useUser } from '../../user';

interface Props {
  post: Models.Document;
}

const PostSave = ({ post }: Props) => {
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useUser();
  const { handlePostSave } = usePostSave();
  const { handlePostUnsave } = usePostUnsave();

  const allSavedPosts = user.save || [];
  const savedPost = allSavedPosts.find(
    (saved: Models.Document) => saved.post.$id === post.$id
  );

  const handleSave = () => {
    if (isSaved) {
      setIsSaved(false);
      handlePostUnsave({
        postId: post.$id,
        postSavedId: savedPost.$id,
      });
    } else {
      setIsSaved(true);
      handlePostSave({ post: post, user: user });
    }
  };

  useEffect(() => {
    if (savedPost) {
      setIsSaved(true);
    }
  }, [user]);

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
        src={isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'}
        width="20px"
        alt="save"
        onClick={handleSave}
      />
    </Box>
  );
};

export default PostSave;
