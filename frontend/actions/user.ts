"use server";
import { cookies } from "next/headers";
import { fetcher } from "@/lib/utils";
import type { User } from "@/types/user";

export const getCurrentUser = async () => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get("auth-token");
  const token = Cookie?.value;

  try {
    const resp = await fetcher<User | null>("/users/@me", {
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: token,
      },
    });

    return resp.data;
  } catch (err) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get("auth-token");
  const token = Cookie?.value;

  try {
    const resp = await fetcher<User | null>("/users/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: token,
      },
    });

    return resp.data;
  } catch (err) {
    return null;
  }
};

export const getUsers = async () => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get("auth-token");
  const token = Cookie?.value;

  try {
    const resp = await fetcher<User[]>("/users", {
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

export const logOut = async () => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get("auth-token");
  const token = Cookie?.value;

  try {
    const resp = await fetcher("/auth/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: token,
      },
      data: {
        token,
      },
    });
    if (resp.status === 200) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const updateUser = async (id: string, data: Partial<User>) => {
  const cookieStore = cookies();
  const Cookie = cookieStore.get("auth-token");
  const token = Cookie?.value;

  try {
    const resp = await fetcher<User>("/users/" + id, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: token,
      },
      data,
    });

    return resp.data;
  } catch (err) {
    console.error('Errrror: ', err);
    return null;
  }
}