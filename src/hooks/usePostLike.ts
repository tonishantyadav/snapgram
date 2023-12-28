import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Models } from 'appwrite';
import AppwriteApi from '../appwrite/appwriteApi';
import { QUERY_KEY } from '../query-key';
import { User } from '../types';

export interface PostLike {
  post: Models.Document;
  user: User;
}

const api = new AppwriteApi();

const usePostLike = () => {
  const queryClient = useQueryClient();
  const postLikeMutation = useMutation({
    mutationFn: ({ post, user }: PostLike) => api.postLike(post, user),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.POST_LIST]);
    },
  });

  const handlePostLike = ({ post, user }: PostLike) => {
    postLikeMutation.mutate({ post, user });
  };

  return {
    handlePostLike,
    isPostLikeSuccess: postLikeMutation.isSuccess,
    isPostLikeError: postLikeMutation.isError,
  };
};

export default usePostLike;
