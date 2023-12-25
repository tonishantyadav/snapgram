import { useQuery } from '@tanstack/react-query';
import AppwriteApi from '../appwrite/appwriteApi';
import { QUERY_KEY } from '../query-key';

const api = new AppwriteApi();

const usePosts = () => {
  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: [QUERY_KEY.POSTS],
    queryFn: () => api.getPosts(),
  });

  return {
    posts: data,
    isPostsSuccess: isSuccess,
    isPostsFailed: isError,
    isPostsLoading: isLoading,
  };
};

export default usePosts;
