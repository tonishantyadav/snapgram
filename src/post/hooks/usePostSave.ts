import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Models } from 'appwrite';
import AppwriteApi from '../../appwrite/appwriteApi';
import { QUERY } from '../../utils/query';

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
  post: Models.Document;
  user: Models.Document;
}

const api = new AppwriteApi();

const usePostSave = () => {
  const queryClient = useQueryClient();
  const postSaveMutation = useMutation({
    mutationFn: ({ post, user }: PostSave) => api.postSave(post.$id, user.$id),
    onMutate: ({ post, user }: PostSave) => {
      try {
        const cachedPosts = queryClient.getQueryData<Models.Document[]>([
          QUERY.POST_LIST,
        ]);

        const cachedUser = queryClient.getQueryData<Models.Document>([
          QUERY.USER,
        ]);

        if (!cachedPosts || !cachedUser) {
          throw new Error('No cached data found');
        }

        const currentLikedPost = cachedPosts.find(
          (p: Models.Document) => p.$id === post.$id
        );

        if (!currentLikedPost) {
          throw new Error('Liked post not found in cache');
        }

        queryClient.setQueryData<Models.Document[]>(
          [QUERY.POST_LIST],
          (oldData) => {
            if (!oldData) return oldData;
            return oldData.map((p: Models.Document) => {
              if (p.$id === post.$id) {
                return { ...p, save: [...p.save, user.$id] };
              }
              return p;
            });
          }
        );

        return { post, cachedPosts };
      } catch (error) {
        throw new Error('Post Save: Optimistic update failed');
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

  const handlePostSave = ({ post, user }: PostSave) => {
    postSaveMutation.mutate({ post, user });
  };

  return {
    handlePostSave,
    isPostSaveSuccess: postSaveMutation.isSuccess,
    isPostSaveFailed: postSaveMutation.isError,
  };
};

export default usePostSave;
