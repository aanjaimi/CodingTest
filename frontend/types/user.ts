export type Avatar = {
  path: string;
  minio: boolean;
};

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: Avatar;
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
