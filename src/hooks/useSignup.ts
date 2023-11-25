import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useCreateUser, useSignin } from '.';
import { INITIAL_USER, SignupFormData } from '../types';

const useSignup = () => {
  const user = useCreateUser();
  const toast = useToast();
  const { handleSignin } = useSignin();
  const [data, setData] = useState<FieldValues>(INITIAL_USER);
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSignup = (formData: FieldValues) => {
    setData(formData);
    user.mutate(formData as SignupFormData);
  };

  useEffect(() => {
    if (user.isSuccess) {
      setIsSignedUp(!isSignedUp);
      handleSignin(data);
    } else if (user.isError) {
      toast({
        title: 'Sign up failed',
        description:
          'Sign up failed. Please use different name or email and try again after sometime',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
    }
  }, [user.isSuccess, user.isError]);

  return { handleSignup, isSignedUp: user.isLoading };
};

export default useSignup;
