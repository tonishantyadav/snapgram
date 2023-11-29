import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import AppwriteApi from '../appwrite/appwriteApi';
import useUserStore, { INITIAL_USER_DATA } from '../store';

const api = new AppwriteApi();

const useUser = () => {
  const { data, isSuccess, isError } = useQuery(['user'], api.getCurrentUser);
  const { user, isAuthenticated, setUser, setIsAuthenticated } = useUserStore();

  useEffect(() => {
    if (isSuccess) {
      setUser({
        id: data.$id,
        name: data.name,
        email: data.email,
        username: data.username,
      });
      setIsAuthenticated(true);
    } else if (isError) {
      setUser(INITIAL_USER_DATA);
      setIsAuthenticated(false);
    }
  }, [isSuccess, isError]);

  return { user, isAuthenticated };
};

export default useUser;
