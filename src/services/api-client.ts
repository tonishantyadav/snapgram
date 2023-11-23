import { ID } from "appwrite";
import { account, appwriteConfig, database } from "../appwrite/config";
import { User } from "../types";

class ApiClient {
  createUser = async (user: User) => {
    try {
      await account.create(ID.unique(), user.email, user.password, user.name);
    } catch (error: any) {
      throw new Error("User account creation is failed: " + error.message);
    }
  };

  saveUserToDB = async (user: User) => {
    try {
      await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        user
      );
    } catch (error: any) {
      throw new Error("Saving user to database failed: " + error.message);
    }
  };
}

export default ApiClient;
