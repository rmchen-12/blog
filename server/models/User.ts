import mongoose, { Document, Model, model, Error } from "mongoose";
import bcrypt from "bcrypt";
import _ from "lodash";

export type UserModel = Document & {
  username: string;
  password: string;
  createAt: Date;
  comparePassword: (
    candidatePassword: string,
    cb: (err: Error, isMatch: boolean) => void
  ) => void;
};

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: String,
    createAt: { type: Date, required: true }
  },
  { timestamps: true }
);

/**
 * Password hash middleware.
 */
(userSchema as any).pre("save", function save(this: any, next: any) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err: Error, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

class UserClass {
  public static publicFields = ["username", "password"];

  public static search(query: string) {
    return (this as any).find({ username: query }, this.publicFields.join(" "));
  }

  public comparePassword(
    candidatePassword: string,
    cb: (err: any, isMatch: any) => void
  ) {
    bcrypt.compare(
      candidatePassword,
      (this as any).password,
      (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
      }
    );
  }
}

userSchema.loadClass(UserClass);

export const User: Model<UserModel> = model<UserModel>("User", userSchema);
