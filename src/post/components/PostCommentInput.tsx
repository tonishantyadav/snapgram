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
import useUserStore from '@user/hooks/useUserStore';
import usePostComment from '@post/hooks/usePostComment';

interface Props {
  post: Models.Document;
}

const PostCommentInput = ({ post }: Props) => {
  const [comment, setComment] = useState<string>('');
  const { user } = useUserStore();
  const { isLoading, handlePostComment } = usePostComment();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleReply = () => {
    if (user && textAreaRef.current) {
      handlePostComment({
        comment: comment,
        post: post,
        user: user,
      });
      setComment('');
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
        resize="none"
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
            Clear
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
            {isLoading ? <Spinner /> : 'Reply'}
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default PostCommentInput;
