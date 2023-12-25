import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import AppwriteApi from '../appwrite/appwriteApi';
import { Post } from '../types';
import { QUERY_KEY } from '../query-key';

const api = new AppwriteApi();

const useCreatePost = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const postMutation = useMutation((data: Post) => api.createPost(data), {
    onSuccess: () => {
      toast({
        title: 'Post Upload Success',
        description: 'Post upload successful. Scroll to view more posts.',
        status: 'success',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
      queryClient.invalidateQueries([QUERY_KEY.POST]);
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

  const handleCreatePost = (data: Post | null) => {
    try {
      if (data) postMutation.mutate(data);
    } catch (error: any) {
      console.log(`Post data is empty: ${error.message}`);
    }
  };

  return {
    handleCreatePost,
    isPostCreationSuccess: postMutation.isSuccess,
    isPostCreationLoading: postMutation.isLoading,
  };
};

export default useCreatePost;
