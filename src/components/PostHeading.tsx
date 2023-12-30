import {
  Avatar,
  Box,
  Center,
  Flex,
  HStack,
  Heading,
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
  edit: boolean;
}

const PostHeading = ({ post, user, edit }: Props) => {
  return (
    <Box>
      <Flex justifyContent="space-between" paddingX={2}>
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
        {edit ? (
          <Center>
            <Box
              display="flex"
              _hover={{
                cursor: 'pointer',
                background: 'gray.700',
              }}
              boxSize="35px"
              borderRadius="50%"
              justifyContent="center"
              alignItems="center"
            >
              <HiDotsHorizontal />
            </Box>
          </Center>
        ) : null}
      </Flex>
    </Box>
  );
};

export default PostHeading;
