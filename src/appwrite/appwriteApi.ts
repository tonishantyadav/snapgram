import { ID, Models, Query } from 'appwrite';
import { AuthUser, Post, User } from '../types';
import { account, appwriteConfig, avatars, database, storage } from './config';

class AppwriteApi {
  // User related operations
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

  async currentUserDetails() {
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

  // File related operations
  async filePreview(fileId: string) {
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

  async fileUpload(file: File) {
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

  async fileUploadDelete(fileId: string) {
    try {
      await storage.deleteFile(appwriteConfig.storageId, fileId);
    } catch (error: any) {
      throw new Error(`File deletion failed: ${error.message}`);
    }
  }

  // Post related operations
  async getPost(postId: string) {
    try {
      return await database.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        postId
      );
    } catch (error: any) {
      throw new Error(`Post not found: ${error.messsage}`);
    }
  }

  async postCreate(post: Post) {
    try {
      const file = await this.fileUpload(post.file[0]);

      if (!file) throw new Error('File upload failed.');

      const fileURL = await this.filePreview(file.$id);

      if (!fileURL) {
        await this.fileUploadDelete(file.$id);
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
        await this.fileUploadDelete(file.$id);
        throw new Error('Post creation failed.');
      }
    } catch (error: any) {
      throw new Error(`Post creation failed: ${error.message}`);
    }
  }

  async postList() {
    try {
      const posts = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.orderDesc('$createdAt'), Query.limit(20)]
      );
      return posts.documents;
    } catch (error: any) {
      throw new Error(`Fetch posts failed: ${error.message}`);
    }
  }

  async postLike(post: Models.Document, user: User) {
    try {
      let likes = post.like || [];
      if (!likes.includes(user.id)) {
        likes.push(user.id);
      }

      console.log('likes: ', likes);

      const response = await database.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        post.$id,
        {
          like: likes,
        }
      );

      console.log('like response: ', response);
    } catch (error: any) {
      throw new Error(`Failed to like the post: ${error.message}`);
    }
  }

  async postUnlike(post: Models.Document, user: User) {
    try {
      let likes = post.like || [];
      if (likes.includes(user.id)) {
        likes = likes.filter((like: any) => like.id !== user.id);
      }

      console.log('unLikes: ', likes);

      const response = await database.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        post.$id,
        {
          like: likes,
        }
      );

      console.log('unlike response: ', response);
    } catch (error: any) {
      throw new Error(`Failed to unlike the post: ${error.message}`);
    }
  }
}

export default AppwriteApi;
