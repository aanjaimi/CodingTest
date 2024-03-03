"use server";
import { cookies } from "next/headers";
import { fetcher } from "@/lib/utils";
import { User } from "@/types/user";

export const getFollowing = async (id: string) => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get("auth-token");
  const token = Cookie?.value;

  try {
    const resp = await fetcher<User[]>("/friend/following/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: token,
      },
    });

    return resp.data;
  } catch (err) {
    return [];
  }
};

export const getFollowers = async (id: string) => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get("auth-token");
  const token = Cookie?.value;

  try {
    const resp = await fetcher<User[]>("/friend/followers/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: token,
      },
    });

    return resp.data;
  } catch (err) {
    return [];
  }
};

export const follow = async (myId:string, id: string) => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get("auth-token");
  const token = Cookie?.value;

  const resp = await fetcher<boolean>("/friend/follow", {
    method: "POST",
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

export const unfollow = async (myId:string, id: string) => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get("auth-token");
  const token = Cookie?.value;

  const resp = await fetcher<boolean>("/friend/unfollow", {
    method: "DELETE",
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
