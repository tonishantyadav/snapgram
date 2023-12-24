import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useSignin } from '.';
import AppwriteApi from '../appwrite/appwriteApi';
import { INITIAL_USER_DATA } from '../store';
import { AuthUser } from '../types';

const api = new AppwriteApi();

const useSignup = () => {
  const userMutation = useMutation({
    mutationFn: (data: AuthUser) => api.register(data),
    onSuccess: (_, data) => {
      api.saveUserToDB(data);
    },
  });
  const toast = useToast();
  const { handleSignin } = useSignin();
  const [data, setData] = useState<FieldValues>(INITIAL_USER_DATA);
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    if (userMutation.isSuccess) {
      setIsSignedUp(!isSignedUp);
      handleSignin(data);
    } else if (userMutation.isError) {
      toast({
        title: 'Sign up failed',
        description:
          'Sign up failed. Please use different name or email and try again!',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
    }
  }, [userMutation.isSuccess, userMutation.isError]);

  const handleSignup = (formData: FieldValues) => {
    setData(formData);
    userMutation.mutate(formData as AuthUser);
  };

  return { handleSignup, isSignedUp: userMutation.isLoading };
};

export default useSignup;
