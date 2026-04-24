import Link from "next/link";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <nav>
        <div className="max-w-3xl mx-auto p-6 space-y-6">
          <ul className="flex gap-3">
            <li>
              <Link href={"/"} className="p-2">
                خانه
              </Link>
            </li>
            <li>
              <Link href={"/posts"} className="p-2">
                مقالات
              </Link>
            </li>
            <li>
              <Link href={"/profile"} className="p-2">
                پروفایل
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {children}
    </div>
  );
}
