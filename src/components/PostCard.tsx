import {
  Box,
  Card,
  CardBody,
  Center,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Models } from 'appwrite';
import {
  PostBody,
  PostCaption,
  PostLike,
  PostSave,
  PostShare,
  PostTags,
} from '.';
import { useUser } from '../hooks';
import PostHeading from './PostHeading';

interface Props {
  post: Models.Document;
  edit: boolean;
}

const PostCard = ({ post, edit }: Props) => {
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
            paddingX={2}
          >
            <CardBody>
              <Stack gap={2}>
                <PostHeading post={post} user={user} edit={edit} />
                <PostBody post={post} />
                <Stack spacing="3" pt={2}>
                  <Flex justifyContent="space-between">
                    <HStack>
                      <PostLike post={post} userId={user?.id || ''} />
                      <PostShare post={post} />
                    </HStack>
                    <PostSave post={post} userId={user?.id || ''} />
                  </Flex>
                  <Flex direction="column">
                    <Box>
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        paddingX={2}
                        paddingBottom={2}
                      >
                        {post && post.like.length} likes
                      </Text>
                    </Box>
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
