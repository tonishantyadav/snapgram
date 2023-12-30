import { Box, Center, Image } from '@chakra-ui/react';
import { Models } from 'appwrite';
import { useEffect, useState } from 'react';
import { usePostSave, usePostUnsave, useUserAll } from '../hooks';

interface Props {
  post: Models.Document;
  userId: string;
}

const PostSave = ({ post, userId }: Props) => {
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useUserAll();
  const { handlePostSave } = usePostSave();
  const { handlePostUnsave } = usePostUnsave();

  const allSavedPosts = user?.save || [];
  const savedPost = allSavedPosts.find(
    (saved: Models.Document) => saved.post.$id === post.$id
  );

  useEffect(() => {
    if (savedPost) {
      setIsSaved(true);
    }
  }, [user]);

  const handleSave = () => {
    if (isSaved) {
      setIsSaved(false);
      handlePostUnsave({ postId: post.$id, postSavedId: savedPost.$id });
    } else {
      setIsSaved(true);
      handlePostSave({ userId: userId, postId: post.$id });
    }
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
        src={isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'}
        width="20px"
        alt="save"
        onClick={handleSave}
      />
    </Box>
  );
};

export default PostSave;
