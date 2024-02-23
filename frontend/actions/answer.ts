"use server";
import { cookies } from "next/headers";
import { fetcher } from "@/lib/utils";
import { Answer } from "@/types/question";

export const addAnswer = async (id: string, answer: Answer) => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get("auth-token");
  const token = Cookie?.value;

  const resp = await fetcher("/questions/answer/" + id, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: token,
    },
    data: {
      questionId: answer.questionId,
      content: answer.content,
    },
  });

  return resp.data;
};

export const removeAnswer = async (id: string, answer: Answer) => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get("auth-token");
  const token = Cookie?.value;

  const resp = await fetcher("/questions/answer/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: token,
    },
  });

  return resp.data;
};

export const updateAnswer = async (id: string, answer: Answer) => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get("auth-token");
  const token = Cookie?.value;

  const resp = await fetcher<boolean>("/questions/answer/" + id, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: token,
    },
    data: {
      content: answer.content,
    },
  });

  return resp.data;
};
