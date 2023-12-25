import { ID, Query } from 'appwrite';
import { AuthUser, Post } from '../types';
import { account, appwriteConfig, avatars, database, storage } from './config';

class AppwriteApi {
  async getCurrentUserDetails() {
    try {
      const userAccount = await account.get();

      if (!userAccount) throw new Error('User account not found.');

      const currentUser = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal('email', userAccount.email)]
      );

      if (!currentUser) throw new Error('Current user not found.');

      return currentUser.documents[0];
    } catch (error: any) {
      throw new Error(`Fetching current user details failed: ${error.message}`);
    }
  }

  async getFilePreview(fileId: string) {
    try {
      return await storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        'top',
        100
      );
    } catch (error: any) {
      throw new Error(`Fetching file URL failed: ${error.message}`);
    }
  }

  async register(user: AuthUser) {
    try {
      await account.create(ID.unique(), user.email, user.password, user.name);
    } catch (error: any) {
      throw new Error(`User registration failed: ${error.message}`);
    }
  }

  async login(user: AuthUser) {
    try {
      await account.createEmailSession(user.email, user.password);
    } catch (error: any) {
      throw new Error(`User sign-in failed: ${error.message}`);
    }
  }

  async logout() {
    try {
      await account.deleteSession('current');
    } catch (error: any) {
      throw new Error(`User sign-out failed: ${error.message}`);
    }
  }

  async saveUserToDB(user: AuthUser) {
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
      throw new Error(`Saving user details failed: ${error.message}`);
    }
  }

  async createPost(post: Post) {
    try {
      const file = await this.uploadFile(post.file[0]);

      if (!file) throw new Error('File upload failed.');

      const fileURL = await this.getFilePreview(file.$id);

      if (!fileURL) {
        await this.deleteUploadFile(file.$id);
        throw new Error('File URL retrieval failed.');
      }

      const tags = post.tags?.replace(/ /g, '').split(',') || [];

      const newPost = await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        ID.unique(),
        {
          creator: post.userId,
          caption: post.caption,
          image: fileURL,
          imageId: file.$id,
          location: post.location,
          tags: tags,
        }
      );

      if (!newPost) {
        await this.deleteUploadFile(file.$id);
        throw new Error('Post creation failed.');
      }
    } catch (error: any) {
      throw new Error(`Post creation failed: ${error.message}`);
    }
  }

  async uploadFile(file: File) {
    try {
      return await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        file
      );
    } catch (error: any) {
      throw new Error(`File upload failed: ${error.message}`);
    }
  }

  async deleteUploadFile(fileId: string) {
    try {
      await storage.deleteFile(appwriteConfig.storageId, fileId);
    } catch (error: any) {
      throw new Error(`File deletion failed: ${error.message}`);
    }
  }
}

export default AppwriteApi;
