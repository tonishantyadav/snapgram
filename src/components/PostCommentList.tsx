import {
  Avatar,
  Box,
  Flex,
  HStack,
  Spinner,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Models } from 'appwrite';
import { usePostCommentList } from '../hooks';
import { multiFormatDateString } from '../utils/formatter';

interface Props {
  post: Models.Document;
}

const PostCommentList = ({ post }: Props) => {
  const {
    postComments,
    isPostCommentsLoading,
    isPostCommentsSuccess,
    isPostCommentsError,
  } = usePostCommentList(post.$id);

  if (isPostCommentsLoading) return <Spinner />;
  if (isPostCommentsError) return <Text>Failed to load the comments</Text>;

  return (
    <VStack
      divider={<StackDivider />}
      spacing={4}
      align="stretch"
      paddingTop={5}
      paddingBottom={8}
    >
      {isPostCommentsSuccess &&
        postComments &&
        postComments.map((c: Models.Document, index: number) => (
          <Box key={index}>
            <HStack gap={5} paddingX={6}>
              <Avatar src={c.user.image} size="sm"></Avatar>
              <Flex direction="column">
                <Text fontWeight="bold">{c.user.name} </Text>
                <Text fontSize="xs" color="gray.300">
                  {multiFormatDateString(c.$createdAt)}
                </Text>
                <Text paddingTop={2} fontSize="sm">
                  {c.comment}
                </Text>
              </Flex>
            </HStack>
          </Box>
        ))}
    </VStack>
  );
};

export default PostCommentList;
