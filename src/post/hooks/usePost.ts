import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import AppwriteApi from '../../appwrite/appwriteApi';
import { QUERY } from '../../utils/query';

const api = new AppwriteApi();

const usePost = (postId: string) => {
  const queryClient = useQueryClient();
  const existingData = queryClient.getQueryData([QUERY.POST, postId]);
  const { mutate, data, isLoading, isSuccess, isError } = useMutation<
    any,
    Error,
    string
  >({
    mutationFn: (postId) => api.getPost(postId),
    onSuccess: (response) => {
      queryClient.setQueryData([QUERY.POST, postId], response);
    },
  });

  useEffect(() => {
    if (postId && !existingData) {
      mutate(postId);
    }
  }, [postId, mutate, existingData]);

  return {
    post: data || existingData,
    isPostLoading: !existingData ? isLoading : false,
    isPostSuccess: !existingData ? isSuccess : true,
    isPostFailed: !existingData ? isError : false,
  };
};

export default usePost;
