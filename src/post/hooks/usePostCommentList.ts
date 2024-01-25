import { api } from '@services/appwrite-api';
import { useQuery } from '@tanstack/react-query';
import { QUERY } from '@utils/query';

const usePostCommentList = (postId: string) => {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [QUERY.POST_COMMENT_LIST, postId],
    queryFn: () => api.postCommentList(postId),
  });

  return {
    postComments: data,
    isLoading: isLoading,
    isSuccess: isSuccess,
    isError: isError,
  };
};

export default usePostCommentList;
