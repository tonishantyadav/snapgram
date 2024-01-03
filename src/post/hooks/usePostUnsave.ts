import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Models } from 'appwrite';
import AppwriteApi from '../../appwrite/appwriteApi';
import { QUERY } from '../../utils/query';

/**
 * Custom hook to handle unsaving a post.
 *
 * Imports React Query hooks and Appwrite API client.
 *
 * Defines interface for PostUnsave arguments.
 *
 * Creates an instance of the Appwrite API client.
 *
 * Main hook function handles unsaving post:
 * - Sets up a mutation with Appwrite API call.
 * - Handles optimistic update of the post list cache.
 * - Invalidates relevant queries on success/error.
 *
 * @returns {{
 *   handlePostUnsave: (args: PostUnsave) => void;
 *   isPostUnsaveSuccess: boolean;
 *   isPostUnSaveFailed: boolean;
 * }}
 */
interface PostUnsave {
  postId: string;
  postSavedId: string;
}

const api = new AppwriteApi();

const usePostUnsave = () => {
  const queryClient = useQueryClient();

  const postUnsaveMutation = useMutation({
    mutationFn: ({ postSavedId }: PostUnsave) => api.postUnsave(postSavedId),
    onMutate: async ({ postId, postSavedId }: PostUnsave) => {
      try {
        const cachedPosts = queryClient.getQueryData<Models.Document[]>([
          QUERY.POST_LIST,
        ]);

        if (!cachedPosts) {
          throw new Error('No cached data found');
        }

        const currentSavedPost = cachedPosts.find(
          (post: Models.Document) => post.$id === postId
        );

        if (!currentSavedPost) {
          throw new Error('Saved post not found in cache');
        }

        queryClient.setQueryData<Models.Document[]>(
          [QUERY.POST_LIST],
          (oldData) => {
            if (!oldData) return [];
            return oldData.map((post: Models.Document) => {
              if (post.$id === postId) {
                const filteredSavedPosts = post.save.filter(
                  (ps: Models.Document) => ps.$id !== postSavedId
                );
                return { ...post, save: [...filteredSavedPosts] };
              }
              return post;
            });
          }
        );

        return { postSavedId, cachedPosts };
      } catch (error) {
        throw new Error('Optimistic update failed');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY.POST_LIST]);
      queryClient.invalidateQueries([QUERY.USER]);
    },
    onError: (_, __, rollbackData: any) => {
      queryClient.setQueryData([QUERY.POST_LIST], rollbackData.cachedPosts);
    },
  });

  const handlePostUnsave = ({ postId, postSavedId }: PostUnsave) => {
    postUnsaveMutation.mutate({ postId, postSavedId });
  };

  return {
    handlePostUnsave,
    isPostUnsaveSuccess: postUnsaveMutation.isSuccess,
    isPostUnSaveFailed: postUnsaveMutation.isError,
  };
};

export default usePostUnsave;
