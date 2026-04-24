import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <div className="container mx-auto p-6 space-y-6">
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
  );
}
