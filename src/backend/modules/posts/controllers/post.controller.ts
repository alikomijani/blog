import { validationPaginationParams } from "@/shared/validation/validationParams";

export type Post = {
  id: number;
  slug: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    userID: number;
    firstName: string;
    lastName: string;
  };
};

export interface PaginatedList<P> {
  list: P[];
  page: number;
  perPage: number;
  count: number;
}

export interface PostModelInterface {
  getPostBySlug: (slug: string) => Promise<Post | undefined>;
  getPostList: (page: number, perPage: number) => Promise<PaginatedList<Post>>;
}

export class PostController {
  postModel: PostModelInterface;
  constructor(postModel: PostModelInterface) {
    this.postModel = postModel;
  }
  async getPostBySlug(slug: string) {
    const post = await this.postModel.getPostBySlug(slug);
    return post;
  }
  async getPostList(page = 1, perPage = 10) {
    validationPaginationParams(page, perPage);

    const paginatedPostList = await this.postModel.getPostList(page, perPage);
    return paginatedPostList;
  }
}
