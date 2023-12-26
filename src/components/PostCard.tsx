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
  useTheme
} from '@chakra-ui/react';
import { Models } from 'appwrite';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks';

interface Props {
  post: Models.Document;
}

const PostCard = ({ post }: Props) => {
  const [showFullCaption, setShowFullCaption] = useState(false);
  const { user } = useUser();
  const theme = useTheme();

  const handleToogleCaption = () => {
    setShowFullCaption(!showFullCaption);
  };

  const truncatedCaption = showFullCaption
    ? post.caption
    : `${post.caption.slice(0, 150)}...`;

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
                    <Heading size="sm">{post.creator.name}</Heading>
                  </HStack>
                  {user?.id === post.creator.$id && (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Image
                        src="/assets/icons/edit.svg"
                        width="20px"
                        height="20px"
                      />
                    </Box>
                  )}
                </Flex>
                <Image src={post.image} alt={post.caption} borderRadius="lg" />
                <Stack spacing="3" pt={2}>
                  <HStack>
                    <Text>
                      {truncatedCaption}{' '}
                      {post.caption.length > 150 && (
                        <Button
                          variant="unstyled"
                          onClick={handleToogleCaption}
                          size="xs"
                          color={theme.colors.gray[500]}
                        >
                          {showFullCaption ? 'less' : 'more'}
                        </Button>
                      )}
                    </Text>
                  </HStack>
                </Stack>
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
