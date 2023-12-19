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
  const user = useMutation({
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
    if (user.isSuccess) {
      setIsSignedUp(!isSignedUp);
      handleSignin(data);
    } else if (user.isError) {
      toast({
        title: 'Sign up failed',
        description:
          'Sign up failed. Please use different name or email and try again',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
    }
  }, [user.isSuccess, user.isError]);

  const handleSignup = (formData: FieldValues) => {
    setData(formData);
    user.mutate(formData as AuthUser);
  };

  return { handleSignup, isSignedUp: user.isLoading };
};

export default useSignup;
