import { useToast } from '@chakra-ui/react';
import { api } from '@services/appwrite-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY } from '@utils/query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const usePost = (postId: string) => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const existingData = queryClient.getQueryData([QUERY.POST, postId]);
  const postMutation = useMutation({
    mutationFn: () => api.getPost(postId),
    onSuccess: (response) => {
      queryClient.setQueryData([QUERY.POST, postId], response);
    },
    onError: () => {
      toast({
        title: 'Failed to load the post detail',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
      navigate('/');
    },
  });

  useEffect(() => {
    if (postId && !existingData) {
      postMutation.mutate();
    }
  }, [postId, postMutation, existingData]);

  return {
    post: postMutation.data || existingData,
    isLoading: !existingData ? postMutation.isLoading : false,
    isSuccess: !existingData ? postMutation.isSuccess : true,
    isError: !existingData ? postMutation.isError : false,
  };
};

export default usePost;
