import { PostModelInterface } from "../controllers/post.controller";
import { PostModelMock } from "./post.models.mock";

export type PostModelType = "MOCK" | "MONGO";

export interface PostModelFactory {
  createModel: () => Promise<PostModelInterface>;
}

export const postModelFactories: Record<PostModelType, PostModelFactory> = {
  MOCK: {
    async createModel() {
      return new PostModelMock();
    },
  },

  MONGO: {
    async createModel() {
      const [{ connectDB }, { default: PostModelMongo }] = await Promise.all([
        import("@/backend/lib/mongodb"),
        import("./post.model.mongo"),
      ]);

      await connectDB();
      return new PostModelMongo();
    },
  },
};
