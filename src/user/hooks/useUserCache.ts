import { useQuery } from '@tanstack/react-query';
import AppwriteApi from '../../appwrite/appwriteApi';
import { QUERY } from '../../utils/query';
import { useUserStore } from '..';

/**
 * useUserAll is a custom React hook that fetches details of the current user.
 *
 * It utilizes the react-query library's useQuery hook to perform the API call to retrieve user details.
 *
 * The hook returns an object containing the user data, along with boolean flags representing
 * the status of the user data retrieval (loading, success, failure).
 *
 * @returns {{
 *   user: Models.Document;
 *   isUserSuccess: boolean;
 *   isUserFailed: boolean;
 *   isUserLoading: boolean;
 * }}
 */
const api = new AppwriteApi();

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
