import { useMutation, useQueryClient } from '@tanstack/react-query';
import AppwriteApi from '../appwrite/appwriteApi';
import { AuthUser } from '../types';

const apiClient = new AppwriteApi();

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AuthUser) => apiClient.userSignup(data),
    onSuccess: (_, data) => {
      apiClient.saveUserToDB(data);
      queryClient.setQueryData(['users'], data);
    },
  });
};

export default useCreateUser;
