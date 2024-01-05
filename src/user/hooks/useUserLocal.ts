import { useEffect } from 'react';
import { useUserStore } from '..';

const useUserLocal = () => {
  const { user, isAuthenticated, setUser, setIsAuthenticated } = useUserStore();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (user && isAuthenticated) {
      const parsedUser = JSON.parse(user);
      const parsedIsAuthenticated = JSON.parse(isAuthenticated);

      if (parsedUser && parsedIsAuthenticated) {
        setUser(parsedUser);
        setIsAuthenticated(parsedIsAuthenticated);
      }
    }
  }, []);

  return { user, isAuthenticated };
};

export default useUserLocal;
