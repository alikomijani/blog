import mongoose, { Schema, Model } from "mongoose";
import { Post, PostModelInterface } from "../controllers/post.controller";
import { validationPaginationParams } from "@/shared/validation/validationParams";

const PostSchema = new Schema<Post>({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String },
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() },
  author: {
    userID: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
});

// اتو اینکریمنت مشابه user
const AutoIncrementFactory = require("mongoose-sequence")(mongoose);
const AutoIncrement = AutoIncrementFactory(mongoose);

PostSchema.plugin(AutoIncrement, { inc_field: "id" });

// جلوگیری از ساخت دوباره مدل هنگام هات‌ریلود
const PostModel: Model<Post> =
  mongoose.models.Post || mongoose.model<Post>("Post", PostSchema);

class PostModelMongo implements PostModelInterface {
  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const post = await PostModel.findOne({ slug }).lean();
    return post ?? undefined;
  }

  async getPostList(page: number = 1, perPage: number = 10) {
    validationPaginationParams(page, perPage);

    const skip = (page - 1) * perPage;

    const list = await PostModel.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage)
      .lean();

    const count = await PostModel.countDocuments();

    return {
      list,
      page,
      perPage,
      count,
    };
  }
}

export default PostModelMongo;
