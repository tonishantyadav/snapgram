import {
  Avatar,
  Box,
  Center,
  Flex,
  HStack,
  Spinner,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Models } from 'appwrite';
import { multiFormatDateString } from '@utils/format-date';
import usePostCommentList from '@post/hooks/usePostCommentList';

interface Props {
  post: Models.Document;
}

const PostCommentList = ({ post }: Props) => {
  const { postComments, isLoading, isSuccess } = usePostCommentList(post.$id);

  if (isLoading)
    return (
      <Center paddingY={5}>
        <Spinner />
      </Center>
    );

  return (
    <VStack
      divider={<StackDivider />}
      spacing={4}
      align="stretch"
      paddingTop={5}
      paddingBottom={8}
    >
      {isSuccess &&
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
