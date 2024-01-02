import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Models } from 'appwrite';
import { useNavigate } from 'react-router-dom';
import AppwriteApi from '../appwrite/appwriteApi';
import { QUERY_KEY } from '../query-key';
import { usePostList } from '.';

const api = new AppwriteApi();

const usePostDelete = (postId: string, onClose: () => void) => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  usePostList();

  const postDeleteMutation = useMutation({
    mutationFn: () => api.postDelete(postId),
    onMutate: () => {
      try {
        const cachedPosts = queryClient.getQueryData([QUERY_KEY.POST_LIST]);
        if (!cachedPosts) {
          throw new Error('No cached data found');
        }

        queryClient.setQueryData([QUERY_KEY.POST_LIST], (oldData: any) => {
          if (!oldData) return [];
          const filteredPostList = oldData.filter(
            (post: Models.Document) => post.$id !== postId
          );
          return filteredPostList;
        });

        return { cachedPosts };
      } catch (error: any) {
        onClose();
        throw new Error('Optimistic updated failed');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.POST_LIST]);
      toast({
        title: 'Post Delete Success',
        description: 'Your post has been deleted.',
        status: 'success',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
      navigate('/');
    },
    onError: (_, __, rollbackData: any) => {
      queryClient.invalidateQueries([QUERY_KEY.POST_LIST]);
      toast({
        title: 'Post Delete Failed',
        description: 'Please try again after sometime.',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
      queryClient.setQueryData([QUERY_KEY.POST_LIST], rollbackData.cachedPosts);
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
