"use server";
import { cookies } from "next/headers";
import { fetcher } from "@/lib/utils";
import { Question } from "@/types/question";

export const addLike = async (id: string, question: Question) => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get("auth-token");
  const token = Cookie?.value;

  const resp = await fetcher("/questions/like/" + id, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: token,
    },
    data: {
      questionId: question.id,
    },
  });

  return resp.data;
};

export const removeLike = async (
  id: string,
  question: Question
) => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get("auth-token");
  const token = Cookie?.value;

  const resp = await fetcher("/questions/like/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: token,
    },
    data: {
      questionId: question.id,
    },
  });

  return resp.data;
};

export const getLike = async (id: string | undefined, question: Question) => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get("auth-token");
  const token = Cookie?.value;

  const resp = await fetcher<boolean>("/questions/like/" + id, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: token,
    },
    data: {
      questionId: question.id,
    },
  });

  return resp.data;
}
