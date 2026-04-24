import { use } from "react";
import { CommentListResponse } from "../data-access/model";
import CommentForm from "./CommentForm";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_NAME } from "@/backend/modules/user/config/constant";
import Link from "next/link";

export default function CommentsSection({
  postSlug,
  postID,
  commentsPromise,
}: {
  postID: number;
  postSlug: string;
  commentsPromise: Promise<CommentListResponse>;
}) {
  // اینجا await نداریم → use() خودش Promise را resolve می‌کند
  const data = use(commentsPromise);
  const cookieStore = use(cookies());
  const accessToken = Boolean(cookieStore.get(ACCESS_TOKEN_NAME)?.value);
  return (
    <div className="mt-12 border-t pt-8">
      {accessToken ? (
        <CommentForm postID={postID} postSlug={postSlug} />
      ) : (
        <div className="p-2 text-center my-5">
          <Link href={`/auth/login?nextPath=/posts/${postSlug}`}>
            برای ثبت نظر باید در سایت ثبت نام کنید
          </Link>
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4">نظرات کاربران</h2>

      {data.list.length === 0 ? (
        <div className="text-gray-400">نظری ثبت نشده است.</div>
      ) : (
        <div className="space-y-4">
          {data.list.map((c, i) => (
            <div key={i} className="p-3 border rounded-lg">
              <div className="font-medium">
                {c.author.firstName} {c.author.lastName}
              </div>
              <div className="text-gray-700 mt-1">{c.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
