import { ID } from "appwrite";
import { account, appwriteConfig, database } from "../appwrite/config";
import { INewUser } from "../types";

class ApiClient {
  createUserAccount = async (user: INewUser) => {
    try {
      await account.create(ID.unique(), user.email, user.password, user.name);
    } catch (error: any) {
      throw new Error("User account creation is failed: " + error.message);
    }
  };

  saveUserAccountToDb = async (account: INewUser) => {
    try {
      await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        account
      );
    } catch (error: any) {
      throw new Error("Saving user to database failed: " + error.message);
    }
  };
}

export default ApiClient;
