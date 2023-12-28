/**
 * usePostLike is a React hook that handles liking/unliking posts.
 *
 * It uses react-query under the hood to make the API call to like/unlike a post.
 *
 * Returns:
 * - handlePostLike: Function to call to like/unlike a post
 * - isPostLikeSuccess: Boolean indicating if the last mutation succeeded
 * - isPostLikeError: Boolean indicating if the last mutation errored
 */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AppwriteApi from '../appwrite/appwriteApi';
import { QUERY_KEY } from '../query-key';
import { Models } from 'appwrite';

export interface PostLike {
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
        // Retrieve cachedPosts and handle the type
        const cachedPosts = queryClient.getQueryData<Models.Document>([
          QUERY_KEY.POST_LIST,
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

        // Perform optimistic update
        queryClient.setQueryData<Models.Document[]>(
          [QUERY_KEY.POST_LIST],
          (oldData) => {
            if (!oldData) return []; // Return empty array if oldData is undefined

            return oldData.map((post) => {
              if (post.$id === postId) {
                return { ...post, like: likes }; // Update like count optimistically
              }
              return post;
            });
          }
        );

        // Return a rollback function to revert the optimistic update if the mutation fails
        return { postId, cachedPosts };
      } catch (error) {
        throw new Error('Optimistic update failed');
      }
    },
    onSuccess: ({ postId }) => {
      queryClient.invalidateQueries([QUERY_KEY.POST, postId]);
    },
    onError: (_, __, rollbackData: any) => {
      // Revert optimistic update on error
      queryClient.setQueryData([QUERY_KEY.POST_LIST], rollbackData.cachedPosts);
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
