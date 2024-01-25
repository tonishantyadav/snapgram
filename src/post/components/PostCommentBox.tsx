import {
  Box,
  Card,
  CardBody,
  Divider,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { Models } from 'appwrite';
import { PostCommentInput, PostCommentList } from '@post/components';

interface Props {
  post: Models.Document;
}

const PostCommentBox = ({ post }: Props) => {
  return (
    <SimpleGrid row={2} cursor="pointer">
      <Box>
        <Card bg="none">
          <CardBody>
            <Stack spacing="3" pt={2}>
              <PostCommentInput post={post} />
            </Stack>
          </CardBody>
        </Card>
      </Box>
      <Divider />
      <Box>
        <PostCommentList post={post} />
      </Box>
    </SimpleGrid>
  );
};

export default PostCommentBox;
