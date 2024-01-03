import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import AppwriteApi from '../../appwrite/appwriteApi';
import { QUERY } from '../../utils/query';
import { PostUpdate } from '../types';

const api = new AppwriteApi();

const usePostUpdate = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const postUpdateMutation = useMutation({
    mutationFn: (post: PostUpdate) => api.postUpdate(post),
    onSuccess: (_, post: PostUpdate) => {
      queryClient.invalidateQueries([QUERY.POST, post.id]);
    },
    onError: (_, post: PostUpdate) => {
      toast({
        title: 'Post Update Failed',
        description: 'Please try again after sometime.',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
      navigate(`/post/${post.id}`);
    },
  });

  const handlePostUpdate = (data: PostUpdate | null) => {
    try {
      if (data) postUpdateMutation.mutate(data);
    } catch (error) {
      throw new Error('Post update data is empty');
    }
  };

  return {
    isLoading: postUpdateMutation.isLoading,
    isSuccess: postUpdateMutation.isSuccess,
    isError: postUpdateMutation.isError,
    isCancel: postUpdateMutation.isPaused,
    handlePostUpdate,
  };
};

export default usePostUpdate;
