import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AppwriteApi from '../appwrite/appwriteApi';
import useUserStore, { INITIAL_USER_DATA } from '../store';
import { AuthUser } from '../types';

const api = new AppwriteApi();

const useSignin = () => {
  const { setUser, setIsAuthenticated } = useUserStore();
  const navigate = useNavigate();
  const toast = useToast();
  const signinMutation = useMutation(api.login);

  useEffect(() => {
    const handleUser = async () => {
      try {
        const userData = await api.getCurrentUserDetails();
        setUser({
          id: userData.$id,
          name: userData.name,
          email: userData.email,
          username: userData.username,
          image: userData.image,
        });
        setIsAuthenticated(true);
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('userAuthenticated', JSON.stringify(true));
      } catch (error) {
        setUser(INITIAL_USER_DATA);
        setIsAuthenticated(false);
        localStorage.setItem('userData', JSON.stringify(null));
        localStorage.setItem('userAuthenticated', JSON.stringify(false));
      }
    };

    if (signinMutation.isSuccess) {
      localStorage.setItem('userSession', JSON.stringify(true));
      handleUser();
      navigate('/');
    } else if (signinMutation.isError) {
      toast({
        title: 'Sign in failed',
        description:
          'Sign in unsuccessful. Please check your email and password and try again',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
      navigate('/signin');
    }
  }, [
    signinMutation.isSuccess,
    signinMutation.isError,
    setUser,
    setIsAuthenticated,
    navigate,
    toast,
  ]);

  const handleSignin = (formData: FieldValues) => {
    signinMutation.mutate(formData as AuthUser);
  };

  return { handleSignin, isSignedIn: signinMutation.isLoading };
};

export default useSignin;
