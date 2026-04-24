import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  ACCESS_TOKEN_NAME,
  MAX_REFRESH_TOKEN_AGE,
  REFRESH_TOKEN_NAME,
} from "./backend/modules/user/config/constant";

const ProtectedRoutes = ["/profile"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isProtectedUrl = ProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtectedUrl) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(ACCESS_TOKEN_NAME)?.value;
  // TODO: verify with public key

  if (accessToken) {
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get(REFRESH_TOKEN_NAME)?.value;

  if (!refreshToken) {
    const loginUrl = new URL(
      `/auth/login?nextPath=${encodeURIComponent(pathname)}`,
      request.url
    );
    return NextResponse.redirect(loginUrl);
  }

  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/refresh",
    {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    const loginUrl = new URL(
      `/auth/login?nextPath=${encodeURIComponent(pathname)}`,
      request.url
    );
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(REFRESH_TOKEN_NAME);
    return response;
  }

  const data = await res.json();

  // مهم: response باید قبل از setCookie ساخته شود
  const response = NextResponse.next();
  response.cookies.set(ACCESS_TOKEN_NAME, data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_REFRESH_TOKEN_AGE,
  });

  return response;
}
