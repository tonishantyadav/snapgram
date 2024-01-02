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

export interface PostCreate {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
}

export interface PostUpdate {
  id: string;
  caption: string;
  imageId: string;
  image: string;
  file: File[];
  location?: string;
  tags?: string;
}
