import { api } from '@services/appwrite-api';
import { useQuery } from '@tanstack/react-query';
import { QUERY } from '@utils/query';

const useTopCreators = () => {
  return useQuery({
    queryKey: [QUERY.TOP_CREATORS],
    queryFn: () => api.creators(),
  });
};

export default useTopCreators;