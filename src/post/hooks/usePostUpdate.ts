import { useToast } from '@chakra-ui/react';
import { PostUpdate } from '@post/types';
import { api } from '@services/appwrite-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY } from '@utils/query';
import { useNavigate } from 'react-router-dom';

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

  const handlePostUpdate = (data: PostUpdate) => {
    postUpdateMutation.mutate(data);
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
