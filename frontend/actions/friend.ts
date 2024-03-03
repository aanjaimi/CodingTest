"use server";
import { cookies } from "next/headers";
import { fetcher } from "@/lib/utils";
import { User } from "@/types/user";

export const isFollowing = async (myId: string, id: string) => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get("auth-token");
  const token = Cookie?.value;

  const resp = await fetcher.get<User[]>("/friend/follow", {
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: token,
    },
    data: {
      myId,
      id,
    },
  });

  return resp.data;
};

export const isFollower = async (myId: string, id: string) => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get("auth-token");
  const token = Cookie?.value;

  const resp = await fetcher.get<User[]>("/friend/follower", {
    headers: {
      Authorization: `Bearer ${token}`,
      Cookie: token,
    },
    data: {
      myId,
      id,
    },
  });

  return resp.data;
};
