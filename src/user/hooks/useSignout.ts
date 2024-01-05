import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import AppwriteApi from '../../appwrite/appwriteApi';

const api = new AppwriteApi();

const useSignout = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const signoutMutation = useMutation({
    mutationFn: () => api.logout(),
    onSuccess: () => {
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userSession');
      queryClient.removeQueries();
      navigate('/signin');
    },
    onError: () => {
      toast({
        title: 'Sign out failed',
        description: 'Please try again after sometime.',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
    },
  });

  const handleSignout = () => {
    signoutMutation.mutate();
  };

  return {
    isLoading: signoutMutation.isLoading,
    isSuccess: signoutMutation.isSuccess,
    isError: signoutMutation.isError,
    handleSignout,
  };
};

export default useSignout;
