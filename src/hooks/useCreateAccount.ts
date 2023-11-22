import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ID } from "appwrite";
import { account } from "../appwrite/config";
import { INewUser } from "../types";

const useCreateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: INewUser) =>
      account.create(ID.unique(), user.email, user.password, user.name),
    onSuccess: (account) => queryClient.setQueryData(["accounts"], account),
  });
};

export default useCreateAccount;
