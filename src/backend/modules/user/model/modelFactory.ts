import UserModelMock from "../model/user.model.mock";
import { UserModelInterface } from "../controller/user.controller";

export type ModelType = "Mock" | "Mongo";

export interface ModelFactory {
  createModel: () => Promise<UserModelInterface>;
}

export const modelFactories: Record<ModelType, ModelFactory> = {
  Mock: {
    async createModel() {
      return new UserModelMock();
    },
  },

  Mongo: {
    async createModel() {
      const [{ connectDB }, { default: UserModelMongo }] = await Promise.all([
        import("@/backend/lib/mongodb"),
        import("../model/user.model.mongo"),
      ]);

      await connectDB();
      return new UserModelMongo();
    },
  },
};
