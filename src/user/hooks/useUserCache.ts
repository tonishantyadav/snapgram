import { api } from '@services/appwrite-api';
import { useQuery } from '@tanstack/react-query';
import { QUERY } from '@utils/query';
import useUserStore from '@user/hooks/useUserStore';

const useUserCache = () => {
  const { setUser, setIsAuthenticated } = useUserStore();
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [QUERY.USER],
    queryFn: async () => await api.currentUserDetails(),
    onSuccess: (user) => {
      setUser(user);
      setIsAuthenticated(true);
    },
  });

  return {
    user: data,
    isUserSuccess: isSuccess,
    isUserFailed: isError,
    isUserLoading: isLoading,
  };
};

export default useUserCache;
