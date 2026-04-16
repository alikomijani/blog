import { NextResponse } from "next/server";
import newUserController from "@/backend/modules/user/controller/newUserController";

const MAX_TOKEN_AGE = 60 * 60 * 24 * 1; // 1d

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userController = await newUserController("Mock");
    const { user, token } = await userController.login(body);

    const response = NextResponse.json({ user, token });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: MAX_TOKEN_AGE,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
