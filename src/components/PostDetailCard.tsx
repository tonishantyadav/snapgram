import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Stack,
} from '@chakra-ui/react';
import { Models } from 'appwrite';
import { PostBody, PostCaption } from '.';
import PostHeading from './PostHeading';
import { useUser } from '../hooks';

interface Props {
  post: Models.Document;
  edit: boolean;
}

const PostDetailCard = ({ post, edit }: Props) => {
  const { user } = useUser();
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
            <PostBody post={post} />
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
