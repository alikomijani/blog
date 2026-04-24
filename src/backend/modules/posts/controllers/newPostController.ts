import { ModelType } from "../../user/model/modelFactory";
import { postModelFactories } from "../models/post.model.factory";
import { PostController } from "./post.controller";

export default async function newPostController() {
  const modelType = (process.env.DATABASE_MODE as ModelType) || "MOCK";
  const factory = postModelFactories[modelType];
  const model = await factory.createModel();
  return new PostController(model);
}
