import { api } from '@services/appwrite-api';
import { useQuery } from '@tanstack/react-query';
import { QUERY } from '@utils/query';

const usePostList = () => {
  return useQuery({
    queryKey: [QUERY.POST_LIST],
    queryFn: () => api.postList(),
  });
};

export default usePostList;
