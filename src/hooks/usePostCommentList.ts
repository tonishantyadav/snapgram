import { useQuery } from '@tanstack/react-query';
import AppwriteApi from '../appwrite/appwriteApi';
import { QUERY_KEY } from '../query-key';

const api = new AppwriteApi();

const usePostCommentList = (postId: string) => {
  const { data, isLoading, isSuccess, isError } = useQuery(
    [QUERY_KEY.POST_COMMENT_LIST, postId],
    () => api.postCommentList(postId)
  );

  return {
    postComments: data,
    isPostCommentsLoading: isLoading,
    isPostCommentsSuccess: isSuccess,
    isPostCommentsError: isError,
  };
};

export default usePostCommentList;
