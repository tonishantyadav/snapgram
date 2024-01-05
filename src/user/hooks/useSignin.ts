import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserSignin } from '..';
import AppwriteApi from '../../appwrite/appwriteApi';
import { QUERY } from '../../utils/query';

const api = new AppwriteApi();

const useSignin = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const signinMutation = useMutation({
    mutationFn: (user: UserSignin) => api.login(user),
    onSuccess: async () => {
      const user: any = await api.currentUserDetails();
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', JSON.stringify(true));
      localStorage.setItem('userSession', JSON.stringify(true));
      queryClient.setQueryData([QUERY.USER], user);
      navigate('/');
    },
    onError: () => {
      toast({
        title: 'Sign in failed',
        description: 'Check your email or password and try again.',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
      localStorage.setItem('user', JSON.stringify(null));
      localStorage.setItem('isAuthenticated', JSON.stringify(false));
      localStorage.setItem('userSession', JSON.stringify(false));
      navigate('/signin');
    },
  });

  const handleSignin = (formData: FieldValues) => {
    signinMutation.mutate(formData as UserSignin);
  };

  return {
    isLoading: signinMutation.isLoading,
    isSuccess: signinMutation.isSuccess,
    handleSignin,
  };
};

export default useSignin;
