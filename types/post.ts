// types/post.ts

export interface IUser {
  userId: string;
  firstName: string;
  lastName: string;
  Profilephoto?: string;
}

export interface IPostDocument {
  _id: string;
  text?: string;
  imageUrl?: string;
  User: IUser;
  likes: string[];
  comments: string[];
  createdAt: Date;
  updatedAt: Date;
}