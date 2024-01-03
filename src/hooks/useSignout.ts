import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppwriteApi from '../appwrite/appwriteApi';
import useUserStore from '../store';

const api = new AppwriteApi();

const useSignout = () => {
  const toast = useToast();
  const { setUser, setIsAuthenticated } = useUserStore();
  const signoutMutation = useMutation(api.logout);
  const navigate = useNavigate();

  useEffect(() => {
    if (signoutMutation.isSuccess) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.setItem('userSession', JSON.stringify(false));
      localStorage.setItem('userData', JSON.stringify(null));
      localStorage.setItem('userAuthenticated', JSON.stringify(false));
      navigate('/signin');
    } else if (signoutMutation.isError) {
      toast({
        title: 'Sign out failed',
        description: 'Sign out unsuccessfull',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
    }
  }, [signoutMutation.isSuccess, signoutMutation.isError]);

  const handleSignout = () => {
    signoutMutation.mutate();
  };

  return { isLoading: signoutMutation.isLoading, handleSignout };
};

export default useSignout;
