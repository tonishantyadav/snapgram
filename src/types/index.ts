export interface INavLink {
  imgURL: string;
  route: string;
  label: string;
}

export interface Post {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
}

export interface UpdatePost {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
}

export interface User {
  id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  image?: string;
  bio?: string;
}

export interface UpdateUser {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
}
