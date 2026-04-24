import { NextResponse } from "next/server";
import newUserController from "@/backend/modules/user/controller/newUserController";

import {
  ACCESS_TOKEN_NAME,
  MAX_ACCESS_TOKEN_AGE,
  MAX_REFRESH_TOKEN_AGE,
  REFRESH_TOKEN_NAME,
} from "@/backend/modules/user/config/constant";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userController = await newUserController();
    const { user, accessToken, refreshToken } = await userController.login(
      body
    );

    const response = NextResponse.json({ user, accessToken, refreshToken });

    response.cookies.set(ACCESS_TOKEN_NAME, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: MAX_ACCESS_TOKEN_AGE,
    });

    response.cookies.set(REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: MAX_REFRESH_TOKEN_AGE,
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    return NextResponse.json({ message: "خطای ناشناخته" }, { status: 500 });
  }
}
