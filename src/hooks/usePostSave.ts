import { useMutation, useQueryClient } from '@tanstack/react-query';
import AppwriteApi from '../appwrite/appwriteApi';
import { QUERY_KEY } from '../query-key';
import { Models } from 'appwrite';

/**
 * usePostSave is a React hook that handles saving posts for a user.
 *
 * It uses the react-query library to make the API call to save the post.
 *
 * The hook handles optimistic updates to temporarily update the cache,
 * invalidating queries on success to refetch fresh data, and rolling back
 * the optimistic update on error.
 *
 * The returned object contains the save post handler function, as well as
 * booleans representing the status of the save mutation.
 *
 * @returns {{
 *   handlePostSave: (args: PostSave) => void;
 *   isPostSaveSuccess: boolean;
 *   isPostSaveFailed: boolean;
 * }}
 */
interface PostSave {
  postId: string;
  userId: string;
}

const api = new AppwriteApi();

const usePostSave = () => {
  const queryClient = useQueryClient();
  const postSaveMutation = useMutation({
    mutationFn: ({ postId, userId }: PostSave) => api.postSave(postId, userId),
    onMutate: async ({ postId, userId }: PostSave) => {
      try {
        // Retrieve cachedPosts and handle the type
        const cachedPosts = queryClient.getQueryData<Models.Document[]>([
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
                return { ...post, save: [...post.save, userId] }; // Update save count optimistically
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
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.POST_LIST]);
      queryClient.invalidateQueries([QUERY_KEY.USER_ALL]);
    },
    onError: (_, __, rollbackData: any) => {
      // Revert optimistic update on error
      queryClient.setQueryData([QUERY_KEY.POST_LIST], rollbackData.cachedPosts);
    },
  });

  const handlePostSave = ({ postId, userId }: PostSave) => {
    postSaveMutation.mutate({ postId, userId });
  };

  return {
    handlePostSave,
    isPostSaveSuccess: postSaveMutation.isSuccess,
    isPostSaveFailed: postSaveMutation.isError,
  };
};

export default usePostSave;
