'use server'
import { cookies } from 'next/headers';
import { fetcher } from "@/lib/utils";
import type { User } from "@/types/user";

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
