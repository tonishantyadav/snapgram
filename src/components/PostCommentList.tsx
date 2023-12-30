import {
  Avatar,
  Box,
  Flex,
  HStack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Models } from 'appwrite';
import { multiFormatDateString } from '../utils/formatter';

interface Props {
  post: Models.Document;
}

const PostCommentList = ({ post }: Props) => {
  const comments = post.comment;

  return (
    <VStack
      divider={<StackDivider />}
      spacing={4}
      align="stretch"
      paddingTop={5}
    >
      {comments.map((c: Models.Document, index: number) => (
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
