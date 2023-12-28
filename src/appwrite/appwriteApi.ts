import { ID, Query } from 'appwrite';
import { AuthUser, Post } from '../types';
import { account, appwriteConfig, avatars, database, storage } from './config';

class AppwriteApi {
  /**
   * Registers a new user account with Appwrite.
   *
   * Accepts an AuthUser object containing the user's email, password, and name.
   * Calls the Appwrite SDK account.create() method to create the user account.
   * Throws an error if account creation fails.
   */
  async register(user: AuthUser) {
    try {
      await account.create(ID.unique(), user.email, user.password, user.name);
    } catch (error: any) {
      throw new Error(`User registration failed: ${error.message}`);
    }
  }

  /**
   * Logs the user in by creating an email session using their email and password.
   */
  async login(user: AuthUser) {
    try {
      await account.createEmailSession(user.email, user.password);
    } catch (error: any) {
      throw new Error(`User sign-in failed: ${error.message}`);
    }
  }

  /**
   * Logs the user out by deleting their current session.
   */
  async logout() {
    try {
      await account.deleteSession('current');
    } catch (error: any) {
      throw new Error(`User sign-out failed: ${error.message}`);
    }
  }

  /**
   * Saves a new user account to the Appwrite database.
   *
   * Accepts an AuthUser object containing the user's details.
   * Generates a unique ID and avatar initials.
   * Creates a new document in the users collection.
   * Returns the created user document.
   * Throws an error if saving to the database fails.
   */
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

  /**
   * Fetches details for the currently logged in user from Appwrite.
   *
   * Gets the current user account from the Appwrite SDK.
   * Queries the users collection to find the user document matching the account email.
   * Returns the user document.
   * Throws errors if the account or user document can't be found.
   */
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

  /**
   * Retrieves a preview URL for the given file ID.
   *
   * Calls the Appwrite SDK to generate a preview URL for the file.
   * The preview is constrained to a max width and height.
   * Returns the preview URL string if successful.
   * Throws an error if the preview URL can't be generated.
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
   * Takes a File object as input.
   * Calls the Appwrite SDK to upload the file.
   * Returns the new file object if successful.
   * Throws an error if the upload fails.
   */
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

  /**
   * Deletes a previously uploaded file by its ID.
   *
   * Calls the Appwrite SDK to delete the file with the given ID.
   * Returns nothing if successful.
   * Throws an error if the file deletion fails.
   */
  async fileUploadDelete(fileId: string) {
    try {
      await storage.deleteFile(appwriteConfig.storageId, fileId);
    } catch (error: any) {
      throw new Error(`File deletion failed: ${error.message}`);
    }
  }

  /**
   * Retrieves a post document from the database by ID.
   *
   * Calls the Appwrite SDK to get a post document by its ID from the database.
   * Returns the post document if found.
   * Throws an error if the post is not found.
   */
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

  /**
   * Creates a new post document in the database.
   *
   * Uploads the post image file, generates a preview URL, creates the post document, and handles errors.
   *
   * @param post - The Post object with user ID, caption, tags, etc.
   * @throws Error if any step of the post creation fails.
   */
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

  /**
   * Retrieves a list of post documents from the database.
   *
   * Queries the post collection, sorting by descending createdAt timestamp and limiting to 20 results.
   *
   * @returns An array of post document objects.
   * @throws Error if the query fails.
   */
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

  /**
   * Updates a post document to add user IDs to the 'like' array field.
   *
   * @param postId - The ID of the post document to update
   * @param likes - Array of user IDs to add to the 'like' field
   * @returns The updated post document
   * @throws Error if the post is not found or the update fails
   */
  async postLike(postId: string, likes: string[]) {
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
}

export default AppwriteApi;
