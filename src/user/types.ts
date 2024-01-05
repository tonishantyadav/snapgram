export interface UserSignup {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface UserSignin {
  email: string;
  password: string;
}

export interface UserUpdate {
  id: string;
  username: string;
  image: string;
  file: File[];
  bio: string;
}
