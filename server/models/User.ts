import mongoose, { Document, Model, model, Schema, Error } from "mongoose";
import bcrypt from "bcrypt";

export type UserModel = Document & {
  username: string;
  password: string;
  comparePassword: comparePasswordFunction;
};

type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: any, isMatch: any) => {}
) => void;

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: String
  },
  { timestamps: true }
);

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err: Error, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

export const User: Model<UserModel> = model<UserModel>("User", userSchema);
