import {
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
} from "@/backend/modules/user/config/constant";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  const logout = async () => {
    "use server";
    const cookie = await cookies();
    cookie.delete(REFRESH_TOKEN_NAME);
    cookie.delete(ACCESS_TOKEN_NAME);
    redirect("/posts");
  };
  return <button onClick={logout}>خروج</button>;
}
