import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  HStack,
  Spinner,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Models } from 'appwrite';
import { useRef, useState } from 'react';
import { usePostComment, useUser, useUserAll } from '../hooks';

interface Props {
  post: Models.Document;
}

const PostCommentInput = ({ post }: Props) => {
  const [comment, setComment] = useState<string>('');
  const { user } = useUserAll();
  const {
    isPostCommentLoading,
    isPostCommentSuccess,
    isPostCommentFailed,
    handlePostComment,
  } = usePostComment();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleReply = () => {
    if (textAreaRef.current) {
      handlePostComment({
        comment: comment,
        post: post,
        user: user,
      });
    }
  };

  return (
    <>
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
            onClick={() => setComment('')}
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
            {isPostCommentLoading ? <Spinner /> : 'Reply'}
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default PostCommentInput;
