import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { User } from "../types";

const apiClient = new ApiClient();

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: User) => apiClient.createUser(user),
    onSuccess: (_, user) => {
      apiClient.saveUserToDB(user);
      queryClient.setQueryData(["users"], user);
    },
  });
};

export default useCreateUser;
