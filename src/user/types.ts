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

export const INITIAL_USER_DATA = {
  id: '',
  name: '',
  email: '',
  username: '',
};
