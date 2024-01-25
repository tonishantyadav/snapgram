import { Box, Image } from '@chakra-ui/react';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';

interface Props {
  post: Models.Document;
}

const PostCardBody = ({ post }: Props) => {
  return (
    <>
      <Box as={Link} to={`/post/${post.$id}`}>
        <Box paddingX={2}>
          <Image
            src={post.image}
            alt="post image"
            borderRadius="20px"
            objectFit="cover"
          />
        </Box>
      </Box>
    </>
  );
};

export default PostCardBody;
