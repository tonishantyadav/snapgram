import { Card, CardBody, Center, Stack } from '@chakra-ui/react';
import { Models } from 'appwrite';
import { PostBody } from '.';
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
      </Card>
    </Center>
  );
};

export default PostDetailCard;
