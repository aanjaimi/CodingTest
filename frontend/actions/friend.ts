"use server";
import { cookies } from "next/headers";
import { fetcher } from "@/lib/utils";
import { User } from "@/types/user";

export const isFollowing = async (id: string) => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get("auth-token");
  const token = Cookie?.value;

  const resp = await fetcher<User>("/users/follow/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: token,
    },
  });

  return resp.data;
};

export const isFollower = async (id: string) => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get("auth-token");
  const token = Cookie?.value;

  const resp = await fetcher<User>("/users/follower/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: token,
    },
  });

  return resp.data;
};
