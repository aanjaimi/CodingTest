import { Topic } from './topic';

export type Question = {
  id: string;
  title: string;
  content: string;
  topic: string;
  location: string;
  userId: string;
  createdAt: string;
};