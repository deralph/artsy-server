import { Iseller, IsellerModel } from "./interface";
import { Schema, model } from "mongoose";
import { hash, genSalt, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const validate = require("mongoose-validator");

//adding maximum character to a mongoose schema?

declare var process: {
  env: {
    JWT_SECRET: string;
    JWT_LIFETIME: string;
  };
};

var nameValidator = [
  validate({
    validator: "isLength",
    arguments: [3, 50],
    message: "Name should be between 3 and 50 characters",
  }),
  validate({
    validator: "isAlphanumeric",
    passIfEmpty: true,
    message: "Name should contain alpha-numeric characters only",
  }),
];

const sellerSchema = new Schema<Iseller>({
  fullName: {
    type: String,
    required: true,
    unique: true,
    validate: nameValidator,
  },
  studio: {
    type: String,
    required: true,
    unique: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

sellerSchema.pre("save", async function () {
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

sellerSchema.methods.CheckPassword = async function (
  passwordToCompare: string
) {
  const isPassword = await compare(passwordToCompare, this.password);
  return isPassword;
};

const secret: string = process.env.JWT_SECRET;

sellerSchema.methods.createToken = async function () {
  const token = sign(
    { username: this.username, userId: this._id, email: this.email },
    secret,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
  return token;
};
sellerSchema.statics.findByUsername = async function (
  email: string,
  username: string
) {
  return await this.findOne({ email, username });
};
sellerSchema.statics.createSeller = async function (body) {
  return await this.create(body);
};

const sellerModel = model<Iseller, IsellerModel>("sellers", sellerSchema);

export default sellerModel;
