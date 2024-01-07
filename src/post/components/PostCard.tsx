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
  PostHeading,
  PostLike,
  PostSave,
  PostShare,
  PostTags,
} from '..';
import { useUserStore } from '../../user';

interface Props {
  post: Models.Document;
  edit: boolean;
}

const PostCard = ({ post, edit }: Props) => {
  const { user } = useUserStore();

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
                {user && <PostHeading post={post} user={user} edit={edit} />}
                <PostBody post={post} />
                <Stack spacing="3" pt={2}>
                  <Flex justifyContent="space-between">
                    <HStack>
                      <PostLike post={post} />
                      <PostShare post={post} />
                    </HStack>
                    <PostSave post={post} />
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
                    <Box>
                      <PostCaption caption={post.caption} />
                    </Box>
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
