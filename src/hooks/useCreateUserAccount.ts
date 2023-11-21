import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ID } from "appwrite";
import { account } from "../appwrite/config";
import { INewUser } from "../types";

const useCreateUserAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: INewUser) =>
      account.create(ID.unique(), user.email, user.password, user.name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

export default useCreateUserAccount;
