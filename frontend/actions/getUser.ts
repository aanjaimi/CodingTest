'use server'
import { cookies } from 'next/headers';
import { fetcher } from "@/lib/utils";
import type { User } from "@/types/user";
import { Question } from '@/types/question';
import { PostSchema } from '@/schemas';
import * as z from 'zod';

export const getCurrentUser = async () => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get('auth-token'); 
  const token = Cookie?.value;

  try {
    const resp = (await fetcher<User | null>("/users/@me", {
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: token,
      },
    
    }));

    return resp.data;
  } catch (err) {
    return null;
  }
};

export const getQuestions = async (data: z.infer<typeof PostSchema>) => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get('auth-token'); 
  const token = Cookie?.value;

  try {
    const resp = (await fetcher.post<Question[] | []>("/questions", {
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: token,
      },
      title: data.title,
      content: data.content,
      topic: data.topic,
    }));
  } catch (err) {
    return [];
  }
}