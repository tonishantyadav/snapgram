import { ID, Query } from 'appwrite';
import { AuthUser } from '../types';
import { account, appwriteConfig, avatars, database } from './config';

class AppwriteApi {
  register = async (user: AuthUser) => {
    try {
      await account.create(ID.unique(), user.email, user.password, user.name);
    } catch (error: any) {
      throw new Error('User account creation is failed: ' + error.message);
    }
  };

  login = async (user: AuthUser) => {
    try {
      await account.createEmailSession(user.email, user.password);
    } catch (error: any) {
      throw new Error('User signin failed: ' + error.message);
    }
  };

  logout = async () => {
    try {
      await account.deleteSession('current');
    } catch (error: any) {
      throw new Error('User signout failed: ' + error.message);
    }
  };

  saveUserToDB = async (user: AuthUser) => {
    const avatar = avatars.getInitials(user.name);

    try {
      return await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
          name: user.name,
          email: user.email,
          username: user.username,
          image: avatar,
        }
      );
    } catch (error: any) {
      throw new Error('Saving user to database failed: ' + error.message);
    }
  };

  getCurrentUser = async () => {
    try {
      const userAccount = await account.get();

      if (!userAccount) throw Error;

      const currentUser = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal('email', userAccount.email)]
      );

      if (!currentUser) throw Error;

      const response = currentUser.documents[0];
      return response;
    } catch (error: any) {
      throw new Error('Get current user details failed: ' + error.message);
    }
  };
}

export default AppwriteApi;
