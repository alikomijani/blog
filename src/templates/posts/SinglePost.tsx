import { Post } from "@/backend/modules/posts/controllers/post.controller";
import CommentsSection from "@/modules/comments/components/CommentsSectionServer";
import { CommentListResponse } from "@/modules/comments/data-access/model";
import { Suspense } from "react";

type SinglePostProps = {
  post: Post;
  commentsPromise: Promise<CommentListResponse>;
};
export default function SinglePost({ post, commentsPromise }: SinglePostProps) {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>

      <div className="text-gray-500 text-sm">
        نویسنده: {post.author.firstName} {post.author.lastName}
      </div>

      <div className="prose prose-lg leading-8">{post.content}</div>

      <div className="text-gray-400 text-xs mt-8">
        تاریخ ایجاد: {new Date(post.createdAt).toLocaleDateString("fa-IR")}
      </div>
      {/* بخش کامنت‌ها */}
      <Suspense
        fallback={
          <div className="text-gray-500">در حال بارگذاری کامنت‌ها...</div>
        }
      >
        <CommentsSection
          postSlug={post.slug}
          postID={post.id}
          commentsPromise={commentsPromise}
        />
      </Suspense>
    </div>
  );
}
