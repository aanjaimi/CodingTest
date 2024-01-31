export type User = {
  id: number;
  email: string;
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
