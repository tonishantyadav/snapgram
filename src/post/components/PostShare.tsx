import { Box, Image } from '@chakra-ui/react';
import { Models } from 'appwrite';
import usePostShare from '@post/hooks/usePostShare';

interface Props {
  post: Models.Document;
}

const PostShare = ({ post }: Props) => {
  const { handleShare } = usePostShare(post);
  return (
    <Box
      boxSize="40px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="50%"
      _hover={{
        cursor: 'pointer',
        backgroundColor: 'gray.700',
      }}
    >
      <Image
        src="/assets/icons/share.svg"
        width="20px"
        alt="share"
        onClick={handleShare}
      />
    </Box>
  );
};

export default PostShare;
