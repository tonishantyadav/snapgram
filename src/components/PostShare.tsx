import { Box, Image } from '@chakra-ui/react';

const PostShare = () => {
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
      <Image src="/assets/icons/share.svg" width="20px" alt="share" />
    </Box>
  );
};

export default PostShare;
