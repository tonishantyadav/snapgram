import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Divider,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Models } from 'appwrite';
import { useUser } from '../hooks';
import { useRef, useState } from 'react';

interface Props {
  post: Models.Document;
}

const PostCommentBox = ({ post }: Props) => {
  const { user } = useUser();
  const [comment, setComment] = useState<string>('');

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleReply = () => {
    if (textAreaRef.current) {
      console.log(comment);
    }
  };

  return (
    <SimpleGrid templateRows="1fr 1fr">
      <Box>
        <Card bg="none">
          <CardBody>
            <Stack spacing="3" pt={2}>
              <HStack>
                <Avatar size="sm" src={user?.image} />
                <Text fontSize="sm" color="gray">
                  Replying to
                </Text>
                <Text color="lightPurpleBg" fontSize="sm">
                  @{post.creator.username}
                </Text>
              </HStack>
              <Textarea
                placeholder="Post your reply..."
                ref={textAreaRef}
                value={comment}
                onChange={handleTextAreaChange}
              />
              <Box display="flex" justifyContent="flex-end">
                <ButtonGroup>
                  <Button
                    borderRadius="20px"
                    variant="outline"
                    _hover={{
                      background: 'red.500',
                    }}
                    type="reset"
                  >
                    Cancel
                  </Button>
                  <Button
                    borderRadius="20px"
                    variant="solid"
                    bg="purpleBg"
                    _hover={{
                      background: 'lightPurpleBg',
                    }}
                    type="submit"
                    onClick={handleReply}
                    isDisabled={!comment.trim()}
                  >
                    Reply
                  </Button>
                </ButtonGroup>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Box>
      <Divider />
      <Box></Box>
    </SimpleGrid>
  );
};

export default PostCommentBox;
