import {
  Box,
  Card,
  CardBody,
  Center,
  Divider,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Models } from 'appwrite';
import { PostBody, PostCaption, PostLike, PostSave, PostTags } from '.';
import { useUser } from '../hooks';

interface Props {
  post: Models.Document;
}

const PostCard = ({ post }: Props) => {
  const { user } = useUser();

  return (
    <Box>
      <Center paddingY={2}>
        <Box>
          <Card
            maxW={{
              base: 'sm',
              md: 'lg',
              lg: 'xl',
            }}
            bg="none"
            boxShadow="none"
            cursor="pointer"
          >
            <CardBody>
              <Stack gap={2}>
                <PostBody post={post} user={user} />
                <Stack spacing="3" pt={2}>
                  <Flex justifyContent="space-between">
                    <PostLike post={post} userId={user?.id || ''} />
                    <PostSave post={post} userId={user?.id || ''} />
                  </Flex>
                  <Flex direction="column">
                    <Text fontSize="sm" fontWeight="bold">
                      {post.like.length} likes
                    </Text>
                    <PostCaption caption={post.caption} />
                  </Flex>
                </Stack>
                <PostTags tags={post.tags} />
              </Stack>
            </CardBody>
          </Card>
        </Box>
      </Center>
      <Divider width="100%" />
    </Box>
  );
};

export default PostCard;
