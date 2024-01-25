import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Models } from 'appwrite';
import { useNavigate } from 'react-router-dom';
import { api } from '@services/appwrite-api';
import { QUERY } from '@utils/query';
import usePostList from '@post/hooks/usePostList';

const usePostDelete = (postId: string, onClose: () => void) => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  usePostList();

  const postDeleteMutation = useMutation({
    mutationFn: () => api.postDelete(postId),
    onMutate: () => {
      try {
        const cachedPosts = queryClient.getQueryData([QUERY.POST_LIST]);
        if (!cachedPosts) {
          throw new Error('No cached data found');
        }

        queryClient.setQueryData([QUERY.POST_LIST], (oldData: any) => {
          if (!oldData) return [];
          const filteredPostList = oldData.filter(
            (post: Models.Document) => post.$id !== postId
          );
          return filteredPostList;
        });

        return { cachedPosts };
      } catch (error: any) {
        onClose();
        throw new Error('Post delete: Optimistic update failed');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY.POST_LIST]);
      toast({
        title: 'Your post is been deleted',
        status: 'success',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
      navigate('/');
    },
    onError: (_, __, rollbackData: any) => {
      queryClient.invalidateQueries([QUERY.POST_LIST]);
      toast({
        title: 'Post Delete Failed',
        description: 'Please try again after sometime.',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
      queryClient.setQueryData([QUERY.POST_LIST], rollbackData.cachedPosts);
      onClose();
    },
  });

  const handlePostDelete = () => {
    postDeleteMutation.mutate();
  };

  return {
    isLoading: postDeleteMutation.isLoading,
    isSuccess: postDeleteMutation.isSuccess,
    isError: postDeleteMutation.isError,
    handlePostDelete,
  };
};

export default usePostDelete;
