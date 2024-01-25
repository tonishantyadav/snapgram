import { api } from '@services/appwrite-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY } from '@utils/query';
import { Models } from 'appwrite';

interface PostComment {
  comment: string;
  post: Models.Document;
  user: Models.Document;
}

const usePostComment = () => {
  const queryClient = useQueryClient();

  const postCommentMutation = useMutation({
    mutationFn: ({ comment, post, user }: PostComment) =>
      api.postComment(comment, post.$id, user.$id),
    onMutate: ({ comment, post, user }: PostComment) => {
      try {
        const cachedPost = queryClient.getQueryData<Models.Document>([
          QUERY.POST,
          post.$id,
        ]);
        const cachedPostCommentList = queryClient.getQueryData<
          Models.Document[]
        >([QUERY.POST_COMMENT_LIST, post.$id]);

        if (!cachedPost && !cachedPostCommentList) {
          throw new Error('No cached data found');
        }

        queryClient.setQueryData<Models.Document>(
          [QUERY.POST, post.$id],
          (oldData: any) => {
            if (!oldData) return oldData;
            return { ...oldData, comment: [...oldData.comment, comment] };
          }
        );

        queryClient.setQueryData<Models.Document[]>(
          [QUERY.POST_COMMENT_LIST, post.$id],
          (oldData: any) => {
            if (!oldData) return [];
            return [
              {
                comment: comment,
                $createdAt: Date.now(),
                user: { ...user },
              },
              ...oldData,
            ];
          }
        );

        return { cachedPost, post };
      } catch (error) {
        throw new Error('Post comment: Optimistic update failed');
      }
    },
    onSuccess: (_, { post }: PostComment) => {
      queryClient.invalidateQueries([QUERY.POST, post.$id]);
    },
    onError: (_, { post }: PostComment, rollbackData: any) => {
      queryClient.setQueryData([QUERY.POST, post.$id], rollbackData.cachedPost);
      throw new Error('Fetch post comments failed');
    },
  });

  const handlePostComment = ({ comment, post, user }: PostComment) => {
    postCommentMutation.mutate({ comment, post, user });
  };

  return {
    isLoading: postCommentMutation.isLoading,
    isSuccess: postCommentMutation.isSuccess,
    isError: postCommentMutation.error,
    handlePostComment,
  };
};

export default usePostComment;
