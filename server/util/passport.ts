import passport from "passport";
import passportLocal from "passport-local";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user as {});
  });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user)
        return done(undefined, false, { message: `${username} not found` });
      user.comparePassword(password, (err: Error, isMatch: boolean) => {
        if (err) return done(err);
        if (isMatch) return done(undefined, user);
        return done(undefined, false, { message: "Invalid  password." });
      });
    });
  })
);

/**
 * Login Required middleware.
 */
export let isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/admin/login");
};
