import { Answer, Favorite, Question, QuestionLike } from "./question";

export type Avatar = {
  path: string;
  minio: boolean;
};

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
  birthday: Date;
  email: string;
  avatar: Avatar;
  questions: Question[];
  answers: Answer[];
  questionLikes: QuestionLike[];
  favorites: Favorite[];
  createdAt: string;
  updatedAt: string;
};

export type State = {
  user: User | null;
};

export type Action = {
  type: "SET_USER";
  payload: User | null;
};

export type Dispatch = (action: Action) => void;

export const initialState: State = {
  user: null,
};
