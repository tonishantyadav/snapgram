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
