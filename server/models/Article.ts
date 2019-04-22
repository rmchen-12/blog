import mongoose, { Document, Model, model } from "mongoose";

export type ArticleModel = Document & {
  title: string;
  author: string;
  content: string;
  tags: [];
  isPublish: boolean;
  viewCount: number;
  commentCount: number;
  coverImg: string;
};

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: Array, required: true },
    isPublish: { type: Boolean, required: true },
    viewCount: Number,
    commentCount: Number,
    coverImg: String
  },
  { timestamps: true }
);

export const Article: Model<ArticleModel> = model<ArticleModel>(
  "Article",
  ArticleSchema
);
