import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Models } from 'appwrite';
import AppwriteApi from '../appwrite/appwriteApi';
import { QUERY_KEY } from '../query-key';

interface PostComment {
  comment: string;
  postId: string;
  userId: string;
}

const api = new AppwriteApi();

const usePostComment = () => {
  const queryClient = useQueryClient();

  const postCommentMutation = useMutation({
    mutationFn: ({ comment, postId, userId }: PostComment) =>
      api.postComment(comment, postId, userId),
    onMutate: ({ comment, postId }: PostComment) => {
      try {
        const cachedPost = queryClient.getQueryData<Models.Document>([
          QUERY_KEY.POST,
          postId,
        ]);
        console.log(cachedPost);

        if (!cachedPost) {
          throw new Error('No cached data found');
        }
        queryClient.setQueryData<Models.Document>(
          [QUERY_KEY.POST, postId],
          (oldData) => {
            if (!oldData) return oldData;
            console.log('oldData: ', oldData);

            return { ...oldData, comment: [...oldData.comment, comment] };
          }
        );
        return { cachedPost, postId };
      } catch (error) {
        throw new Error('Post comment: Optimistic updated failed');
      }
    },
    onSuccess: (_, { postId }: PostComment) => {
      queryClient.invalidateQueries([QUERY_KEY.POST, postId]);
    },
    onError: (_, { postId }: PostComment, rollbackData: any) => {
      queryClient.setQueryData(
        [QUERY_KEY.POST, postId],
        rollbackData.cachedPost
      );
    },
  });

  const handlePostComment = ({ comment, postId, userId }: PostComment) => {
    postCommentMutation.mutate({ comment, postId, userId });
  };

  return {
    handlePostComment,
    isPostCommentLoading: postCommentMutation.isLoading,
    isPostCommentSuccess: postCommentMutation.isSuccess,
    isPostCommentFailed: postCommentMutation.error,
  };
};

export default usePostComment;
