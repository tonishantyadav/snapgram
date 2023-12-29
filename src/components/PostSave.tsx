import { Image } from '@chakra-ui/react';
import { Models } from 'appwrite';
import { useEffect, useState } from 'react';
import { usePostUnsave, useUserAll } from '../hooks';
import usePostSave from '../hooks/usePostSave';

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
    <Image
      src={isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'}
      width="20px"
      alt="saved"
      onClick={handleSave}
    />
  );
};

export default PostSave;
