import { Post } from "@/backend/modules/posts/controllers/post.controller";
import Link from "next/link";

type ListPostProps = {
  page: number;
  perPage: number;
  data: {
    list: Post[];
    page: number;
    perPage: number;
    count: number;
  };
};
export default function ListPost({ data, page, perPage }: ListPostProps) {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">لیست پست‌ها</h1>

      <div className="space-y-4">
        {data.list.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow transition"
          >
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </Link>
            <p className="text-gray-600 mt-2 line-clamp-3">{post.content}</p>

            <div className="mt-3 text-sm text-gray-500">
              نویسنده: {post.author.firstName} {post.author.lastName}
            </div>
          </div>
        ))}
      </div>

      {/* pagination ساده */}
      <div className="flex items-center justify-between mt-6">
        <a
          href={`?page=${page > 1 ? page - 1 : 1}&perPage=${perPage}`}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          قبلی
        </a>

        <span className="text-gray-700">
          صفحه {data.page} از {Math.ceil(data.count / data.perPage)}
        </span>

        <a
          href={`?page=${page + 1}&perPage=${perPage}`}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          بعدی
        </a>
      </div>
    </div>
  );
}
