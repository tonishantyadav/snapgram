import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  useTheme,
} from '@chakra-ui/react';
import { Models } from 'appwrite';
import { useEffect, useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks';
import { multiFormatDateString } from '../utils/formatter';
import PostTags from './PostTags';

interface Props {
  post: Models.Document;
}

const PostCard = ({ post }: Props) => {
  const [caption, setCaption] = useState('');
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const { user } = useUser();
  const theme = useTheme();

  const handleToogleCaption = () => {
    setShowFullCaption(!showFullCaption);
  };

  const truncatedCaption = showFullCaption
    ? post.caption
    : `${post.caption.slice(0, 150)}`;

  useEffect(() => {
    if (truncatedCaption) {
      setCaption(`${truncatedCaption}...`);
    }
  }, [truncatedCaption, caption]);

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
                <Image src={post.image} alt={post.caption} borderRadius="lg" />
                <Stack spacing="3" pt={2}>
                  <Flex justifyContent="space-between">
                    <HStack gap={5}>
                      {isPostLiked ? (
                        <Image
                          src="/assets/icons/liked.svg"
                          width="20px"
                          alt="liked"
                          onClick={() => setIsPostLiked(!isPostLiked)}
                        />
                      ) : (
                        <Image
                          src="/assets/icons/like.svg"
                          width="20px"
                          alt="like"
                          _hover={{ filter: 'grayscale(100%)' }}
                          onClick={() => setIsPostLiked(!isPostLiked)}
                        />
                      )}

                      <Image
                        src="/assets/icons/comment.svg"
                        width="20px"
                        alt="comment"
                        _hover={{ filter: 'grayscale(100%)' }}
                      />
                      <Image
                        src="/assets/icons/post-share.svg"
                        width="20px"
                        alt="share"
                        _hover={{ filter: 'grayscale(100%)' }}
                      />
                    </HStack>
                    <Image
                      src="/assets/icons/save.svg"
                      width="20px"
                      alt="save"
                    />
                  </Flex>
                  <HStack>
                    <Text>
                      {caption}
                      {caption.length > 150 && (
                        <Button
                          variant="unstyled"
                          onClick={handleToogleCaption}
                          size="xs"
                          color={theme.colors.gray[500]}
                          paddingLeft={1}
                        >
                          {showFullCaption ? 'less' : 'more'}
                        </Button>
                      )}
                    </Text>
                  </HStack>
                </Stack>
                {post.tags && <PostTags tags={post.tags} />}
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
