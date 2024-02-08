'use server'
import { cookies } from 'next/headers';
import { fetcher } from "@/lib/utils";
import { Question } from '@/types/question';
import { PostSchema } from '@/schemas';
import { getCurrentUser } from './getUser';
import * as z from 'zod';

export const AddQuestion = async (data: z.infer<typeof PostSchema>) => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get('auth-token'); 
  const token = Cookie?.value;

  try {
    const user = await getCurrentUser();
    const resp = (await fetcher.post<Question | null>(
      process.env.NEXT_PUBLIC_BACKEND_ORIGIN +  "/questions", {
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: token,
      },
      title: data.title,
      content: data.content,
      topic: data.topic,
      userId: user?.id,
    }))
    return resp.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const GetQuestions = async () => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get('auth-token'); 
  const token = Cookie?.value;

  try {
    const resp = (await fetcher.get<Question[] | []>("/questions", {
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: token,
      },
    }))
    return resp.data;
  } catch (err) {
    return [];
  }
}