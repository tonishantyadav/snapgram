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

  const postCreateMutation = useMutation({
    mutationFn: (data: PostCreate) => api.postCreate(data),
    onSuccess: () => {
      toast({
        title: 'Post upload successful. Scroll to view more posts.',
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
        title: 'Post upload failed',
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
