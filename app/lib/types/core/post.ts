import { User } from "./user";

export type Post = {
  id: number;
  content: string;
  timeAgo: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  category: string;
  user: User;
};

export type NewPost = {
  content: string;
  category: string;
};
