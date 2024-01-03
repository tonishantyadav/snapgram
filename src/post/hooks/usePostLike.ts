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
        // Retrieve cachedPosts and handle the type
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

        // Perform optimistic update
        queryClient.setQueryData<Models.Document[]>(
          [QUERY.POST_LIST],
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
      queryClient.invalidateQueries([QUERY.POST, postId]);
    },
    onError: (_, __, rollbackData: any) => {
      // Revert optimistic update on error
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
