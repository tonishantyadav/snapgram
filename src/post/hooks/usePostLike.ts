import { api } from '@services/appwrite-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY } from '@utils/query';
import { Models } from 'appwrite';

interface PostLike {
  postId: string;
  likes: string[];
}

const usePostLike = () => {
  const queryClient = useQueryClient();
  const postLikeMutation = useMutation({
    mutationFn: ({ postId, likes }: PostLike) => api.postLike(postId, likes),
    onMutate: async ({ postId, likes }: PostLike) => {
      try {
        const cachedPosts = queryClient.getQueryData<Models.Document[]>([
          QUERY.POST_LIST,
        ]);

        if (!cachedPosts) {
          throw new Error('No cached data found');
        }

        const currentLikedPost = cachedPosts.find(
          (post: Models.Document) => post.$id === postId
        );

        if (!currentLikedPost) {
          throw new Error('Liked post not found in cache');
        }

        queryClient.setQueryData<Models.Document[]>(
          [QUERY.POST_LIST],
          (oldData) => {
            if (!oldData) return [];

            return oldData.map((post) => {
              if (post.$id === postId) {
                return { ...post, like: likes };
              }
              return post;
            });
          }
        );

        return { postId, cachedPosts };
      } catch (error) {
        throw new Error('Post like: Optimistic update failed');
      }
    },
    onSuccess: ({ postId }) => {
      queryClient.invalidateQueries([QUERY.POST, postId]);
    },
    onError: (_, __, rollbackData: any) => {
      queryClient.setQueryData([QUERY.POST_LIST], rollbackData.cachedPosts);
    },
  });

  const handlePostLike = ({ postId, likes }: PostLike) => {
    postLikeMutation.mutate({ postId, likes });
  };

  return {
    handlePostLike,
    isPostLikeSuccess: postLikeMutation.isSuccess,
    isPostLikeError: postLikeMutation.isError,
  };
};

export default usePostLike;
