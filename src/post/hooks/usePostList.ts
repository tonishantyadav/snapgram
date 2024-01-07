import { useQuery } from '@tanstack/react-query';
import AppwriteApi from '../../appwrite/appwriteApi';
import { QUERY } from '../../utils/query';

const api = new AppwriteApi();

const usePostList = () => {
  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: [QUERY.POST_LIST],
    queryFn: () => api.postList(),
  });

  return {
    posts: data,
    isLoading: isLoading,
    isSuccess: isSuccess,
    isError: isError,
  };
};

export default usePostList;
