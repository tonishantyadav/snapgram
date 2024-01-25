import {
  Avatar,
  Box,
  Flex,
  HStack,
  Heading,
  Text,
  theme,
} from '@chakra-ui/react';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import { PostEditOptions } from '@post/components';
import { multiFormatDateString } from '@utils/format-date';

interface Props {
  post: Models.Document;
  user: Models.Document;
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
        {edit ? <PostEditOptions /> : null}
      </Flex>
    </Box>
  );
};

export default PostHeading;
