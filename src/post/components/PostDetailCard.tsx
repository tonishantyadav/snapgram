import { Box, Card, CardBody, Center, Stack } from '@chakra-ui/react';
import { Models } from 'appwrite';
import { PostCaption, PostCardBody, PostHeading } from '@post/components';

interface Props {
  post: Models.Document;
  user: Models.Document;
  edit: boolean;
}

const PostDetailCard = ({ post, user, edit }: Props) => {
  return (
    <Center>
      <Card
        maxW={{
          base: 'sm',
          md: 'lg',
          lg: 'xl',
        }}
        bg="none"
        boxShadow="none"
        cursor="pointer"
        paddingX={2}
      >
        <CardBody>
          <Stack gap={2}>
            <PostHeading post={post} user={user} edit={edit} />
            <PostCardBody post={post} />
          </Stack>
        </CardBody>
        <Box paddingStart={5} paddingBottom={4}>
          <PostCaption caption={post.caption} />
        </Box>
      </Card>
    </Center>
  );
};

export default PostDetailCard;
