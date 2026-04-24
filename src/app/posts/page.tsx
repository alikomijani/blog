import { Post } from "@/backend/modules/posts/controllers/post.controller";
import ListPost from "@/templates/posts/ListPost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مقالات",
};

export default async function Page(props: {
  searchParams: Promise<{ page?: string; perPage?: string }>;
}) {
  // Next.js 16 → searchParams یک Promise است
  const sp = await props.searchParams;

  const page = Number(sp.page ?? 1);
  const perPage = Number(sp.perPage ?? 10);

  // Fetch از API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?page=${page}&perPage=${perPage}`,
    {
      cache: "no-store", // چون دیتای پویا است
    }
  );

  if (!res.ok) {
    return <div className="p-6 text-red-600">خطا در دریافت اطلاعات پست‌ها</div>;
  }

  const data: {
    list: Post[];
    page: number;
    perPage: number;
    count: number;
  } = await res.json();

  return <ListPost data={data} page={page} perPage={perPage} />;
}
