import { NextResponse } from "next/server";
import { createAccessToken, verifyToken } from "@/backend/lib/jwt";
import {
  MAX_REFRESH_TOKEN_AGE,
  REFRESH_TOKEN_NAME,
} from "@/backend/modules/user/config/constant";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const refreshToken = body.refreshToken;
    if (!refreshToken) {
      return NextResponse.json(
        { message: "refreshToken is required" },
        { status: 401 }
      );
    }
    const { userID } = verifyToken(refreshToken, "REFRESH");
    const accessToken = createAccessToken(userID);

    const response = NextResponse.json({ accessToken });

    response.cookies.set(REFRESH_TOKEN_NAME, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: MAX_REFRESH_TOKEN_AGE,
    });
    return response;
  } catch {
    return NextResponse.json(
      { message: "refreshToken is invalid" },
      { status: 401 }
    );
  }
}
