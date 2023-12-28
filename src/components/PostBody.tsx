import {
  Avatar,
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  theme,
} from '@chakra-ui/react';
import { Models } from 'appwrite';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { User } from '../types';
import { multiFormatDateString } from '../utils/formatter';

interface Props {
  post: Models.Document;
  user: User | null;
}

const PostBody = ({ post, user }: Props) => {

  return (
    <>
      <Flex justifyContent="space-between">
        <HStack pb={2} as={Link} to={`/profile/${user?.id}`}>
          <Box borderRadius="full">
            <Avatar src={post.creator.image} size="sm" />
          </Box>
          <Flex direction="column">
            <Heading size="sm">{post.creator.name}</Heading>
            <Text
              fontSize="x-small"
              color={theme.colors.gray[600]}
              fontWeight="bold"
            >
              {multiFormatDateString(post.$createdAt)}
            </Text>
          </Flex>
        </HStack>
        <HiDotsHorizontal />
      </Flex>
      <Box as={Link} to={`/post/${post.$id}`}>
        <Image src={post.image} alt="post image" borderRadius="lg" />
      </Box>
    </>
  );
};

export default PostBody;
