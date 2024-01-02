import { ID, Query } from 'appwrite';
import { AuthUser, PostCreate, PostUpdate } from '../types';
import { account, appwriteConfig, avatars, database, storage } from './config';

class AppwriteApi {
  /**
   * Registers a new user account with Appwrite.
   *
   * @param {AuthUser} user - Object containing user's email, password, and name.
   * @throws {Error} - Throws an error if account creation fails.
   * @returns {Promise<void>}
   */
  async register(user: AuthUser): Promise<void> {
    try {
      await account.create(ID.unique(), user.email, user.password, user.name);
    } catch (error: any) {
      throw new Error(`User registration failed: ${error.message}`);
    }
  }

  /**
   * Logs the user in by creating an email session using their email and password.
   *
   * @param {AuthUser} user - Object containing user's email and password.
   * @throws {Error} - Throws an error if sign-in fails.
   * @returns {Promise<void>}
   */
  async login(user: AuthUser): Promise<void> {
    try {
      await account.createEmailSession(user.email, user.password);
    } catch (error: any) {
      throw new Error(`User sign-in failed: ${error.message}`);
    }
  }

  /**
   * Logs the user out by deleting their current session.
   *
   * @throws {Error} - Throws an error if sign-out fails.
   * @returns {Promise<void>}
   */
  async logout(): Promise<void> {
    try {
      await account.deleteSession('current');
    } catch (error: any) {
      throw new Error(`User sign-out failed: ${error.message}`);
    }
  }

  /**
   * Saves a new user account to the Appwrite database.
   *
   * @param {AuthUser} user - Object containing user's details.
   * @throws {Error} - Throws an error if saving to the database fails.
   * @returns {Promise<any>} - Returns the created user document.
   */
  async saveUserToDB(user: AuthUser): Promise<any> {
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

  /**
   * Fetches details for the currently logged in user from Appwrite.
   *
   * @throws {Error} - Throws an error if user details retrieval fails.
   * @returns {Promise<any>} - Returns the user document.
   */
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

  /**
   * Retrieves a preview URL for the given file ID.
   *
   * @param {string} fileId - ID of the file to retrieve the preview URL.
   * @throws {Error} - Throws an error if the preview URL retrieval fails.
   * @returns {Promise<string>} - Returns the preview URL string.
   */
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

  /**
   * Uploads a file to Appwrite storage.
   *
   * @param {File} file - File object to upload.
   * @throws {Error} - Throws an error if the file upload fails.
   * @returns {Promise<any>} - Returns the new file object.
   */
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

  /**
   * Deletes a previously uploaded file by its ID.
   *
   * @param {string} fileId - ID of the file to delete.
   * @throws {Error} - Throws an error if the file deletion fails.
   * @returns {Promise<void>}
   */
  async fileUploadDelete(fileId: string): Promise<void> {
    try {
      await storage.deleteFile(appwriteConfig.storageId, fileId);
    } catch (error: any) {
      throw new Error(`File deletion failed: ${error.message}`);
    }
  }

  /**
   * Retrieves a post document from the database by ID.
   *
   * @param {string} postId - ID of the post document to retrieve.
   * @throws {Error} - Throws an error if the post retrieval fails.
   * @returns {Promise<any>} - Returns the post document.
   */
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

  /**
   * Retrieves the URL for a previously uploaded file.
   *
   * Uploads the first file in the array, gets a preview URL for it,
   * and returns the file object and URL. If any step fails, attempts
   * to clean up by deleting the uploaded file before throwing an error.
   *
   * @param uploadedFile - Array containing the file object to upload and get a URL for.
   * @throws {Error} If the upload, preview URL retrieval, or cleanup fails.
   * @returns {Object} The uploaded file object and preview URL.
   */
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

  /**
   * Creates a new post document in the database.
   *
   * @param {PostCreate} post - Post object containing user ID, caption, tags, etc.
   * @throws {Error} - Throws an error if the post creation fails.
   * @returns {Promise<void>}
   */
  async postCreate(post: PostCreate): Promise<void> {
    try {
      const { file, fileUrl } = await this.getFileUrl(post.file);
      const tags = post.tags?.replace(/ /g, '').split(',') || [];

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
            tags: tags,
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

  /**
   * Updates a post document with new data.
   *
   * @param post - The PostUpdate object containing the updated data.
   * @throws {Error} If the update fails at any stage.
   * @returns {Promise<void>}
   */
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

  /**
   * Retrieves a list of post documents from the database.
   *
   * @throws {Error} - Throws an error if post retrieval fails.
   * @returns {Promise<any[]>} - Returns an array of post document objects.
   */
  async postList(): Promise<any[]> {
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

  /**
   * Updates a post document to add user IDs to the 'like' array field.
   *
   * @param {string} postId - ID of the post document to update.
   * @param {string[]} likes - Array of user IDs to add to the 'like' field.
   * @throws {Error} - Throws an error if the post update fails.
   * @returns {Promise<any>} - Returns the updated post document.
   */
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

  /**
   * Saves a post by creating a document in the 'saves' collection
   * associating the post ID with the user ID.
   *
   * @param {string} postId - ID of the post to save.
   * @param {string} userId - ID of the user saving the post.
   * @throws {Error} - Throws an error if the save fails.
   * @returns {Promise<any>} - Returns the newly created save document.
   */
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

  /**
   * Deletes a saved post document from the 'saves' collection.
   *
   * @param {string} postSavedId - ID of the saved post document to delete.
   * @throws {Error} - Throws an error if the delete operation fails.
   * @returns {Promise<void>}
   */
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

  /**
   * Creates a new comment document in the 'comments' collection,
   * associating the comment text with the given post ID and user ID.
   *
   * @param comment - The text content of the comment.
   * @param postId - The ID of the post being commented on.
   * @param userId - The ID of the user creating the comment.
   *
   * @throws Error if the database insert fails.
   */
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

  /**
   * Fetches a list of comment documents for the given post ID.
   *
   * @param postId - The ID of the post to get comments for.
   * @returns A promise resolving to the list of comment documents.
   * @throws Error if the database query fails.
   */
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
}

export default AppwriteApi;
