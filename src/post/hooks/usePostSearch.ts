import { api } from '@services/appwrite-api';
import { useQuery } from '@tanstack/react-query';
import { QUERY } from '@utils/query';

const usePostSearch = (searchText: string) => {
  return useQuery({
    queryKey: [QUERY.POST_SEARCH, searchText],
    queryFn: () => api.postSearch(searchText),
    enabled: !!searchText,
  });
};

export default usePostSearch;
