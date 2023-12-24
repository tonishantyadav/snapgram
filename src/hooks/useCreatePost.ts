import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppwriteApi from '../appwrite/appwriteApi';
import { Post } from '../types';

const api = new AppwriteApi();

const useCreatePost = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const postMutation = useMutation((data: Post) => api.createPost(data));

  useEffect(() => {
    if (postMutation.isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
      toast({
        title: 'Post Upload Success',
        description: 'Post creation successful, Redirecting to homepage...',
        status: 'success',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
      navigate('/');
    } else if (postMutation.isError) {
      toast({
        title: 'Post Upload Failed',
        description: 'Post creation unsuccessful. Please try again!',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
    }
  }, [
    postMutation.isSuccess,
    postMutation.isError,
    navigate,
    queryClient,
    toast,
  ]);

  const handleCreatePost = (postFormData: Post) => {
    postMutation.mutate(postFormData);
  };

  return {
    handleCreatePost,
    isPostCreationSuccess: postMutation.isSuccess,
    isPostCreationLoading: postMutation.isLoading,
  };
};

export default useCreatePost;
