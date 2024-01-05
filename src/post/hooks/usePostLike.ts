import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Models } from 'appwrite';
import AppwriteApi from '../../appwrite/appwriteApi';
import { QUERY } from '../../utils/query';

/**
 * usePostLike is a React hook that handles liking/unliking posts.
 *
 * It utilizes the react-query library's useMutation hook to perform the API call
 * to like/unlike a post. It also manages optimistic updates for the post list cache
 * based on the like action.
 *
 * @returns {{
 *   handlePostLike: (args: PostLike) => void;
 *   isPostLikeSuccess: boolean;
 *   isPostLikeError: boolean;
 * }}
 */
interface PostLike {
  postId: string;
  likes: string[];
}

const api = new AppwriteApi();

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
