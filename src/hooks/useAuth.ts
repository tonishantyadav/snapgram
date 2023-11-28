import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import AppwriteApi from '../appwrite/appwriteApi';
import useAuthStore, { INITIAL_USER_DATA } from '../store';

const apiClient = new AppwriteApi();

const useAuth = () => {
  const { data, isSuccess, isError } = useQuery(
    ['user'],
    apiClient.getCurrentUser
  );
  const { user, isAuthenticated, setUser, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isSuccess) {
      setUser({
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

export default useAuth;
