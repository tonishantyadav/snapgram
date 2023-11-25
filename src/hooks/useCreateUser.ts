import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { User } from "../types";

const apiClient = new ApiClient();

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: User) => apiClient.createUser(data),
    onSuccess: (_, data) => {
      apiClient.saveUserToDB(data);
      queryClient.setQueryData(["users"], data);
    },
  });
};

export default useCreateUser;
