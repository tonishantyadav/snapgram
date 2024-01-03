import { useEffect } from 'react';
import useAuthStore from '../store';

const useUser = () => {
  const { user, isAuthenticated, setUser, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const userAuthenticated = localStorage.getItem('userAuthenticated');

    if (userData && userAuthenticated) {
      const parsedUserData = JSON.parse(userData);
      const parseUserAuthenticated = JSON.parse(userAuthenticated);
      if (parsedUserData && parseUserAuthenticated) {
        setUser({
          id: parsedUserData.$id,
          name: parsedUserData.name,
          username: parsedUserData.username,
          email: parsedUserData.email,
          image: parsedUserData.image,
          bio: parsedUserData.bio,
        });
        setIsAuthenticated(true);
      } else {
        setUser(user);
        setIsAuthenticated(isAuthenticated);
      }
    }
  }, []);

  return { user, isAuthenticated };
};

export default useUser;
