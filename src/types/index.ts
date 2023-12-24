export interface BaseUser {
  name: string;
  email: string;
  username: string;
}

export interface AuthUser extends BaseUser {
  password: string;
}

export interface User extends BaseUser {
  id: string;
  imageId?: string;
  image?: string;
  bio?: string;
}

export interface Post {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string
}