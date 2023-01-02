import { hash, genSalt, compare } from "bcryptjs";
import jwt, { sign } from "jsonwebtoken";
import { Schema, model } from "mongoose";
import { Iuser, IuserModel } from "./interface";

declare var process: {
  env: {
    JWT_SECRET: string;
    JWT_LIFETIME: string;
  };
};

const userSchema = new Schema<IuserModel>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  recieveEmail: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function () {
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

userSchema.methods.CheckPassword = async function (passwordToCompare: string) {
  const isPassword = await compare(passwordToCompare, this.password);
  return isPassword;
};

const secret: string = process.env.JWT_SECRET;

userSchema.methods.createToken = async function () {
  console.log(secret);
  console.log(process.env.JWT_LIFETIME);
  console.log(process.env.JWT_SECRET);
  const token = sign(
    { username: this.username, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
  return token;
};

userSchema.statics.findByUsername = async function (
  email: string,
  username?: string
) {
  return await this.findOne({ email, username });
};
userSchema.statics.createUser = async function (body: Iuser) {
  return await this.create(body);
};

const model_ = model<Iuser, IuserModel>("user", userSchema);

export default model_;
