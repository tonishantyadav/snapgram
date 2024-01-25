import { useToast } from '@chakra-ui/react';
import { PostCreate } from '@post/types';
import { api } from '@services/appwrite-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY } from '@utils/query';
import { useNavigate } from 'react-router-dom';

const usePostCreate = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const postCreateMutation = useMutation({
    mutationFn: (post: PostCreate) => api.postCreate(post),
    onSuccess: () => {
      toast({
        title: 'Your post is been uploaded. Scroll to view more posts.',
        status: 'success',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
      queryClient.invalidateQueries([QUERY.POST_LIST]);
      navigate('/');
    },
    onError: (_, __, rollbackData: any) => {
      queryClient.setQueryData([QUERY.POST_LIST], rollbackData.cachedPost);
      toast({
        title: 'Post upload failed',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
      navigate('/');
    },
  });

  const handlePostCreate = (data: PostCreate | null) => {
    try {
      if (data) postCreateMutation.mutate(data);
    } catch (error) {
      throw new Error('Create post data is empty');
    }
  };

  return {
    handlePostCreate,
    isLoading: postCreateMutation.isLoading,
    isSuccess: postCreateMutation.isSuccess,
    isError: postCreateMutation.isError,
  };
};

export default usePostCreate;
