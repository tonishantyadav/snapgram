import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import AppwriteApi from '../../appwrite/appwriteApi';
import { QUERY } from '../../utils/query';
import { PostCreate } from '../types';

const api = new AppwriteApi();

const usePostCreate = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const postMutation = useMutation({
    mutationFn: (data: PostCreate) => api.postCreate(data),
    onSuccess: () => {
      toast({
        title: 'Post Upload Success',
        description: 'Post upload successful. Scroll to view more posts.',
        status: 'success',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
      queryClient.invalidateQueries([QUERY.POST]);
      navigate('/');
    },
    onError: () => {
      toast({
        title: 'Post Upload Failed',
        description: 'Post upload unsuccessful. Please try again!',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
    },
  });

  const handlePostCreate = (data: PostCreate | null) => {
    try {
      console.log(data);
      if (data) postMutation.mutate(data);
    } catch (error) {
      throw new Error('Create post data is empty');
    }
  };

  return {
    handlePostCreate,
    isLoading: postMutation.isLoading,
    isSuccess: postMutation.isSuccess,
    isError: postMutation.isError,
  };
};

export default usePostCreate;
