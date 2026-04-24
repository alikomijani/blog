import { CommentListResponse } from "./model";

export function getComments(postID: number): Promise<CommentListResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments?postID=${postID}`,
    {
      next: {
        revalidate: 5,
        tags: [`comments-${postID}`],
      },
    }
  ).then((r) => r.json());
}
