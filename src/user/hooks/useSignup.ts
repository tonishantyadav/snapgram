import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';
import { UserSignup, useSignin } from '..';
import AppwriteApi from '../../appwrite/appwriteApi';

const api = new AppwriteApi();

const useSignup = () => {
  const { handleSignin } = useSignin();
  const toast = useToast();
  const signupMutation = useMutation({
    mutationFn: (user: UserSignup) => api.register(user),
    onSuccess: (_, data) => {
      api.saveUserToDB(data);
      handleSignin(data);
    },
    onError: () => {
      toast({
        title: 'Sign up failed',
        description:
          'Sign up failed. Please use different name or email and try again!',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
    },
  });

  const handleSignup = (formData: FieldValues) => {
    signupMutation.mutate(formData as UserSignup);
  };

  return {
    isLoading: signupMutation.isLoading,
    isSuccess: signupMutation.isSuccess,
    isError: signupMutation.isError,
    handleSignup,
  };
};

export default useSignup;
