import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AppwriteApi from '../appwrite/appwriteApi';
import useUserStore from '../store';
import { AuthUser } from '../types';

const api = new AppwriteApi();

const useSignin = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const signinMutation = useMutation(api.login);
  const { setIsAuthenticated } = useUserStore();

  useEffect(() => {
    if (signinMutation.isSuccess) {
      setIsAuthenticated(true);
      localStorage.setItem('userSession', 'true');
      navigate('/');
    } else if (signinMutation.isError) {
      toast({
        title: 'Sign in failed',
        description:
          'Sign in unsuccessfull. Please check your email and password and try again',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
      navigate('/signin');
    }
  }, [signinMutation.isSuccess, signinMutation.isError]);

  const handleSignin = (formData: FieldValues) => {
    signinMutation.mutate(formData as AuthUser);
  };

  return { handleSignin, isSignedIn: signinMutation.isLoading };
};

export default useSignin;
