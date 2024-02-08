import { Topic } from './topic';
import { User } from './user';

export type Question = {
  id: string;
  title: string;
  content: string;
  topic: string;
  location: string;
  userId: string;
  user: User;
  createdAt: string;
};