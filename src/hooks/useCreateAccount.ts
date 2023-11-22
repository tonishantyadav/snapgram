import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { INewUser } from "../types";

const apiClient = new ApiClient();

const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: INewUser) => apiClient.createUserAccount(user),
    onSuccess: (_, account) => {
      console.log(account);
      apiClient.saveUserAccountToDb(account);
      queryClient.setQueryData(["accounts"], account);
    },
  });
};

export default useCreateAccount;
