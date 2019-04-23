import { Article } from "../models/Article";
import { Request, Response, NextFunction } from "express";

export const addArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content, tags, isPublish } = req.body;
  const author = req.user.username;
  const coverImg = "/banner.jpeg";
  const viewCount = 0;
  const commentCount = 0;
  const newArticle = new Article({
    title,
    author,
    content,
    tags,
    isPublish,
    viewCount,
    commentCount,
    coverImg
  });
  try {
    await newArticle.save();
    res.json({ message: "create success!", code: 1 });
  } catch (err) {
    res.json({ message: err.message || err.toString(), code: 0 });
  }
};
