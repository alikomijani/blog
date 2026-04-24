import { Post } from "@/backend/modules/posts/controllers/post.controller";
import { getComments } from "@/modules/comments/data-access/api";
import SinglePost from "@/templates/posts/SinglePost";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  // Next.js 16: params → Promise
  const { slug } = await props.params;

  // fetch post
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`,
    {
      cache: "force-cache",
      next: {
        tags: [`post-${slug}`],
      },
    }
  );

  if (!res.ok) {
    return (
      <div className="p-10 text-red-600 text-center">
        خطا در دریافت اطلاعات پست
      </div>
    );
  }

  const post: Post = await res.json();
  const commentsPromise = getComments(post.id);

  return <SinglePost post={post} commentsPromise={commentsPromise} />;
}
