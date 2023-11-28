export interface User {
  name: string;
  email: string;
  username: string;
}

export interface AuthUser extends User {
  password: string;
}

export interface UserProfile extends User {
  imageId: string | null;
  image: string | null;
  bio: string | null;
}
