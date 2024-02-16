import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/profile", "/home"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname);

  const url = request.nextUrl.clone();

  const cookie = request.cookies.get("auth-token");

  if (!cookie) return NextResponse.redirect(url.origin + "/");

  const token = cookie?.value;

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_ORIGIN + "/users/@me",
      {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: `auth-token=${token}`,
        },
      }
    );

    if (!response.ok) return NextResponse.redirect(url.origin + "/");

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(url.origin + "/");
  }
}
