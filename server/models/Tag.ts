import mongoose, { Document, Model, model } from 'mongoose';

export type TagModel = Document & {
  tagName: string;
  url: string;
};

const tagSchema = new mongoose.Schema(
  {
    tagName: { type: String, unique: true, required: true },
    url: { type: String, unique: true, required: true }
  },
  { timestamps: true }
);

export const Tag: Model<TagModel> = model<TagModel>("Tag", tagSchema);
