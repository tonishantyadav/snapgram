import { api } from '@services/appwrite-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY } from '@utils/query';
import { Models } from 'appwrite';

interface PostUnsave {
  postId: string;
  postSavedId: string;
}

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
        throw new Error('Post unsave: Optimistic update failed');
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
