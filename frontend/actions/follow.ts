"use server";
import { cookies } from "next/headers";
import { fetcher } from "@/lib/utils";
import { User } from "@/types/user";

export const getFollowing = async (id: string) => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get("auth-token");
  const token = Cookie?.value;

  try {
    const resp = await fetcher<User[]>("/users/following/" + id, {
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
    const resp = await fetcher<User[]>("/users/followers/" + id, {
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