import Navbar from "@/shared/components/navbar";
import { Metadata } from "next";
import Link from "next/link";
import { PropsWithChildren } from "react";
import LogoutButton from "./LogoutButton";

export const metadata: Metadata = {
  title: "پروفایل کاربر",
  robots: "no follow, no index",
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="flex gap-1">
          <div className="w-[300px]">
            <ul className="flex flex-col gap3 rounded-md p-3 border">
              <li>
                <Link
                  className="p-3 block hover:bg-gray-200"
                  href={"/profile/info"}
                >
                  مشخصات کاربری
                </Link>
              </li>
              <li>
                <Link
                  className="p-3 block hover:bg-gray-200"
                  href={"/profile/comments"}
                >
                  نظرها
                </Link>
              </li>
              <li>
                <Link
                  className="p-3 block hover:bg-gray-200"
                  href={"/profile/liked-posts"}
                >
                  پست های پسند شده
                </Link>
              </li>
              <li className="p-3 block hover:bg-gray-200 cursor-pointer">
                <LogoutButton />
              </li>
            </ul>
          </div>
          <div className="grow">{children}</div>
        </div>
      </div>
    </div>
  );
}
