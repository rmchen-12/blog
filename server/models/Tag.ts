import mongoose, { Document, Model, model } from "mongoose";
import _ from "lodash";

export type TagModel = Document & {
  tagName: string;
};

const tagSchema = new mongoose.Schema(
  {
    tagName: { type: String, unique: true, required: true }
  },
  { timestamps: true }
);

export const Tag: Model<TagModel> = model<TagModel>("Tag", tagSchema);
