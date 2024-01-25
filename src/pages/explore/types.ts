import { Models } from 'appwrite';

export interface ExplorePosts {
  posts: Models.Document[] | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}