export type Comment = {
  author: {
    userID: number;
    firstName: string;
    lastName: string;
  };
  postID: number;
  content: string;
};

export type CommentListResponse = { list: Comment[]; count: number };
