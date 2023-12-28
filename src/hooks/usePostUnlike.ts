import { useMutation, useQueryClient } from '@tanstack/react-query';
import AppwriteApi from '../appwrite/appwriteApi';
import { QUERY_KEY } from '../query-key';
import { Models } from 'appwrite';
import { User } from '../types';

export interface PostUnlike {
  post: Models.Document;
  user: User;
}

const api = new AppwriteApi();

const usePostUnlike = () => {
  const queryClient = useQueryClient();
  const postUnlikeMutation = useMutation({
    mutationFn: ({ post, user }: PostUnlike) => api.postUnlike(post, user),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.POST_LIST]);
    },
  });

  const handlePostUnlike = ({ post, user }: PostUnlike) => {
    postUnlikeMutation.mutate({ post, user });
  };

  return {
    handlePostUnlike,
    isPostUnlikeSuccess: postUnlikeMutation.isSuccess,
    isPostUnlikeError: postUnlikeMutation.isError,
  };
};

export default usePostUnlike;
