import { hash, genSalt, compare } from "bcryptjs";
import jwt, { sign } from "jsonwebtoken";
import { Schema, model } from "mongoose";
import { Arts } from "./interface";

const artSchema = new Schema<Arts>(
  {
    sellerId: {
      type: String,
      required: true,
    },
    artName: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: Object,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const artsModel = model<Arts>("arts", artSchema);

export default artsModel;
