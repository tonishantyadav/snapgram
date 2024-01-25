import { Box, Image } from '@chakra-ui/react';
import { Models } from 'appwrite';
import usePostShare from '@post/hooks/usePostShare';
import share from '@assets/icons/share.svg';

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
      <Image src={share} width="20px" alt="share" onClick={handleShare} />
    </Box>
  );
};

export default PostShare;
