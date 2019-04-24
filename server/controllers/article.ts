import { Article } from "../models/Article";
import { Request, Response, NextFunction } from "express";
import logger from "../util/logger";

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
    logger.error(err);
    res.json({ message: err.message || err.toString(), code: 0 });
  }
};

export const updateArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, title, content, tags, isPublish } = req.body;
    await Article.update({ _id: id }, { title, content, tags, isPublish });
    res.json({ message: "update article success!", code: 1 });
  } catch (err) {
    logger.error(err);
    res.json({ message: err.message || err.toString(), code: 0 });
  }
};

export const getArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articles = await Article.find({}).sort({ createdAt: -1 });
    res.json({ articles, code: 1 });
  } catch (err) {
    res.json({ message: err.message || err.toString(), code: 0 });
  }
};

export const getArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    const article = await Article.find({ _id: id });
    res.json({ article: article[0], code: 1 });
  } catch (err) {
    res.json({ message: err.message || err.toString(), code: 0 });
  }
};

export const deleteArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    await Article.deleteOne({ _id: id });
    res.json({ message: "delete article success", code: 1 });
  } catch (err) {
    logger.error(err);
    res.json({ message: err.message || err.toString(), code: 0 });
  }
};
