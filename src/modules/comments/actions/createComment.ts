"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createComment(
  prevState: { ok: boolean; message?: string },
  formData: FormData
) {
  const postID = formData.get("postID");
  const content = formData.get("content");

  if (!postID || !content) {
    throw new Error("Invalid form data");
  }
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments`, {
    method: "POST",
    body: JSON.stringify({
      postID,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
      cookie: cookieHeader,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    return { ok: false, message: error.message || "خطایی رخ داد" };
  }

  // اگر صفحه نیاز به رفرش SSR دارد
  revalidatePath(`/posts/${postID}`);
  return { ok: true };
}
