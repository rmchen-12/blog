import passport from "passport";
import { UserModel, User } from "../models/User";
import { Request, Response, NextFunction } from "express";
import { IVerifyOptions } from "passport-local";
import "../util/passport";

export const postLogin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    (err: Error, user: UserModel, info: IVerifyOptions) => {
      if (err) return next(err);
      if (!user) return res.json({ message: info.message, code: 0 });
      req.logIn(user, err => {
        if (err) return next(err);
        res.json({ message: "login success", code: 1 });
      });
    }
  )(req, res, next);
};

export const postSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, rePassword } = req.body;
  const user = new User({
    username,
    password,
    createAt: new Date()
  });
  if (password !== rePassword) {
    return res.json({ message: "两次密码不一致", code: 0 });
  }
  User.findOne({ username }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser)
      return res.json({ message: `${username} is already exist!`, code: 0 });
    user.save(err => {
      if (err) return next(err);
      req.logIn(user, err => {
        if (err) return next(err);
        res.json({ message: `success created`, code: 1 });
      });
    });
  });
};
