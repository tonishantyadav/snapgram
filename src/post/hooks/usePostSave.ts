import { api } from '@services/appwrite-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY } from '@utils/query';
import { Models } from 'appwrite';

interface PostSave {
  post: Models.Document;
  user: Models.Document;
}

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
