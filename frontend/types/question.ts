import { User } from './user';

export type Favorite = {
  id: string;
  user: User;
  userId: string;
};

export type QuestionLike = {
  id: string;
  user: User;
  userId: string;
};

export type Answer = {
  id: string;
  content: string;
  user: User;
  userId: string;
  questionId: string;
  question: Question;
};

export type Question = {
  id: string;
  title: string;
  content: string;
  topic: string;
  location: string;
  userId: string;
  user: User;
  questionLikes: QuestionLike[];
  favorites: Favorite[];
  answers: Answer[];
  createdAt: string;
};