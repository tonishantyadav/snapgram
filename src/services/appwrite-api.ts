import { ID, Query } from 'appwrite';
import {
  account,
  avatars,
  database,
  appwriteConfig,
  storage,
} from '@services/appwrite-config';
import { PostCreate, PostUpdate } from '@post/types';
import { UserSignup, UserSignin, UserUpdate } from '@user/types';

class AppwriteApi {
  async register(user: UserSignup): Promise<void> {
    try {
      await account.create(ID.unique(), user.email, user.password, user.name);
    } catch (error: any) {
      throw new Error(`User registration failed: ${error.message}`);
    }
  }

  async login(user: UserSignin): Promise<void> {
    try {
      await account.createEmailSession(user.email, user.password);
    } catch (error: any) {
      throw new Error(`User sign-in failed: ${error.message}`);
    }
  }

  async logout(): Promise<void> {
    try {
      await account.deleteSession('current');
    } catch (error: any) {
      throw new Error(`User sign-out failed: ${error.message}`);
    }
  }

  async saveUserToDB(user: UserSignup): Promise<any> {
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

  async currentUserDetails(): Promise<any> {
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

  async userProfileUpdate(user: UserUpdate) {
    console.log('userUpdate');

    try {
      if (user.file.length > 0) {
        const { file, fileUrl } = await this.getFileUrl(user.file);
        const updatedUser = await database.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          user.id,
          {
            username: user.username,
            image: fileUrl,
            bio: user.bio,
          }
        );
        if (!updatedUser) {
          await this.fileUploadDelete(file.$id);
          throw new Error('Failed to update the user details');
        }
      } else if (user.image) {
        const updatedUser = await database.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          user.id,
          {
            username: user.username,
            image: user.image,
            bio: user.bio,
          }
        );
        if (!updatedUser) {
          throw new Error('Failed to update the user details');
        }
      }
    } catch (error: any) {
      throw new Error(`No user details found for updating: ${error.message}`);
    }
  }

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

  async fileUpload(file: File): Promise<any> {
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

  async fileUploadDelete(fileId: string): Promise<void> {
    try {
      await storage.deleteFile(appwriteConfig.storageId, fileId);
    } catch (error: any) {
      throw new Error(`File deletion failed: ${error.message}`);
    }
  }

  async getPost(postId: string): Promise<any> {
    try {
      return await database.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        postId
      );
    } catch (error: any) {
      throw new Error(`Post not found: ${error.message}`);
    }
  }

  async getFileUrl(uploadedFile: File[]) {
    try {
      const file = await this.fileUpload(uploadedFile[0]);
      if (!file) throw new Error('File upload failed.');

      const fileUrl = await this.filePreview(file.$id);
      if (!fileUrl) {
        await this.fileUploadDelete(file.$id);
        throw new Error(
          'The uploaded file is being removed as there was an issue retrieving the file URL.'
        );
      }
      return { file, fileUrl };
    } catch (error: any) {
      throw new Error('File URL retrieval failed.');
    }
  }

  async postCreate(post: PostCreate): Promise<void> {
    try {
      const { file, fileUrl } = await this.getFileUrl(post.file);

      if (file && fileUrl) {
        const newPost = await database.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.postCollectionId,
          ID.unique(),
          {
            creator: post.userId,
            caption: post.caption,
            imageId: file.$id,
            image: fileUrl,
            location: post.location,
            tags: post.tags,
          }
        );

        if (!newPost) {
          await this.fileUploadDelete(file.$id);
          throw new Error('Post creation failed.');
        }
      }
    } catch (error: any) {
      throw new Error(`Failed to create the post: ${error.message}`);
    }
  }

  async postList(): Promise<any[]> {
    try {
      const posts = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.orderDesc('$createdAt'), Query.limit(30)]
      );
      return posts.documents;
    } catch (error: any) {
      throw new Error(`Fetch posts failed: ${error.message}`);
    }
  }

  async postUpdate(post: PostUpdate) {
    try {
      const tags = post.tags?.replace(/ /g, '').split(',') || [];

      if (post.file.length > 0) {
        const { file, fileUrl } = await this.getFileUrl(post.file);
        if (file && fileUrl) {
          const updatePost = await database.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            post.id,
            {
              caption: post.caption,
              imageId: file.$id,
              image: fileUrl,
              location: post.location,
              tags: tags,
            }
          );
          if (!updatePost) {
            await this.fileUploadDelete(file.$id);
            throw new Error('Post updation failed.');
          }
        }
      } else if (post.image) {
        const updatePost = await database.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.postCollectionId,
          post.id,
          {
            caption: post.caption,
            imageId: post.imageId,
            image: post.image,
            location: post.location,
            tags: tags,
          }
        );
        if (!updatePost) {
          throw new Error('Post updation failed.');
        }
      } else {
        throw new Error('No file found in a post.');
      }
    } catch (error: any) {
      throw new Error(`Failed to update the post: ${error.message}`);
    }
  }

  async postDelete(postId: string) {
    try {
      await database.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        postId
      );
    } catch (error: any) {
      throw new Error(`Failed to delete the post: ${error.message}`);
    }
  }

  async postLike(postId: string, likes: string[]): Promise<any> {
    try {
      const post = await database.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        postId,
        { like: likes }
      );
      if (!post) throw new Error('Post not found.');

      return post;
    } catch (error: any) {
      throw new Error(`Post like failed: ${error.message}`);
    }
  }

  async postSave(postId: string, userId: string): Promise<any> {
    try {
      const response = await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.saveCollectionId,
        ID.unique(),
        {
          post: postId,
          user: userId,
        }
      );
      if (!response) throw new Error('Post not found.');

      return response;
    } catch (error: any) {
      throw new Error(`Post save failed: ${error.message}`);
    }
  }

  async postUnsave(postSavedId: string): Promise<void> {
    try {
      const response = await database.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.saveCollectionId,
        postSavedId
      );
      if (!response) throw new Error('Post not found.');
    } catch (error: any) {
      throw new Error(`Post unsave failed: ${error.message}`);
    }
  }

  async postComment(comment: string, postId: string, userId: string) {
    try {
      await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.commentCollectionId,
        ID.unique(),
        {
          comment: comment,
          post: postId,
          user: userId,
        }
      );
    } catch (error: any) {
      throw new Error(`Post comment failed: ${error.message}`);
    }
  }

  async postCommentList(postId: string) {
    try {
      const response = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.commentCollectionId,
        [Query.equal('post', [postId]), Query.orderDesc('$createdAt')]
      );
      return response.documents;
    } catch (error: any) {
      throw new Error(`Fetch post comments failed: ${error.message}`);
    }
  }

  async postSearch(searchText: string) {
    try {
      const response = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.search('caption', searchText)]
      );
      return response.documents;
    } catch (error: any) {
      throw new Error(`Fetch search post failed: ${error.message}`);
    }
  }

  async creators() {
    try {
      const response = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.orderDesc('$createdAt'), Query.limit(6)]
      );
      return response.documents;
    } catch (error: any) {
      throw new Error(`Fetch creators failed: ${error.message}`);
    }
  }
}

export const api = new AppwriteApi();
