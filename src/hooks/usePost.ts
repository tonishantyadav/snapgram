import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import AppwriteApi from '../appwrite/appwriteApi';
import { QUERY_KEY } from '../query-key';

const api = new AppwriteApi();

const usePost = (postId: string) => {
  const queryClient = useQueryClient();
  const existingData = queryClient.getQueryData([QUERY_KEY.POST, postId]);
  const { mutate, data, isLoading, isSuccess, isError } = useMutation<
    any,
    Error,
    string
  >({
    mutationFn: (postId) => api.getPost(postId),
    onSuccess: (response) => {
      queryClient.setQueryData([QUERY_KEY.POST, postId], response); // Update or set the query data
    },
  });

  // Trigger the mutation on component mount or when postId changes
  useEffect(() => {
    if (postId && !existingData) {
      // Check if data is not already present in the cache
      mutate(postId);
    }
  }, [postId, mutate, existingData]);

  return {
    post: data || existingData, // Use existingData if available to prevent unnecessary re-renders
    isPostLoading: !existingData ? isLoading : false,
    isPostSuccess: !existingData ? isSuccess : true,
    isPostFailed: !existingData ? isError : false,
  };
};

export default usePost;
