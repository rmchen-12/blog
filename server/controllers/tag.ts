import { Tag } from "../models/Tag";
import { Request, Response } from "express";
import Logger from "../util/logger";

export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await Tag.find({}).sort({ createdAt: 1 });
    res.json({ tags, code: 1 });
  } catch (err) {
    res.json({ message: err.message || err.toString(), code: 0 });
  }
};

export const createTag = async (req: Request, res: Response) => {
  const { tagName } = req.body;
  try {
    const tag = await Tag.findOne({ tagName });
    if (tag)
      return res.json({ message: `${tagName} is already exist!`, code: 0 });
    await Tag.create({ tagName });
    res.json({ message: "create tag success", code: 1 });
  } catch (err) {
    Logger.error(err);
    res.json({ message: err.message || err.toString(), code: 0 });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    await Tag.deleteOne({ _id: id });
    res.json({ message: "delete tag success", code: 1 });
  } catch (err) {
    Logger.error(err);
    res.json({ message: err.message || err.toString(), code: 0 });
  }
};
