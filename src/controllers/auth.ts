import { CookieOptions, Request, Response } from "express";

import User from "../models/user";
import Seller from "../models/Seller";
import Unathenticated from "../errors/unauthenticated";
import { Iseller, Iuser } from "../models/interface";
import serverError from "../errors/serverError";
import BadRequest from "../errors/badRequest";

interface Input {
  email: String;
  username: String;
  password: String;
  seller: Boolean;
}

const TokenOption: CookieOptions = {
  httpOnly: true,
  expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
  secure: true,
  sameSite: "none",
};
const Login = async (req: Request, res: Response) => {
  const { email, username, password, seller }: Input = req.body;
  // console.log({ email, username, password });
  console.log(req.body);

  if (!email || !username || !password) {
    console.log("you have errors");
    throw new Unathenticated("enter all inputs");
  }
  if (seller === true) {
    console.log("checking for errors");
    const seller = await Seller.findByUsername(email, username);
    if (!seller) {
      console.log("you have some errors");
      throw new Unathenticated(
        "Seller with this name and email does not exist"
      );
    }
    const isPass = await seller.CheckPassword(password);

    if (!isPass) throw new Unathenticated("wrong password");

    const token = await seller.createToken();
    if (!token) {
      throw new Unathenticated("an error ocurred while generating token");
    }
    return res
      .status(200)
      .cookie("token", token, TokenOption)
      .json({ userLoggedIn: true });
  }

  const user: any = await User.findByUsername(email, username);

  if (!user) {
    console.log("you have some errors");
    throw new Unathenticated("user with this name and email does not exist");
  }
  const isPassword = await user.CheckPassword(password);

  if (!isPassword) {
    throw new Unathenticated("wrong password");
  }

  const token = await user.createToken();
  console.log("checking for any errors");
  if (!token) {
    throw new Unathenticated("an error ocurred while generating token");
  }

  return res
    .status(200)
    .cookie("token", token, TokenOption)
    .json({ userLoggedIn: true });
};

const sellerSignup = async (req: Request, res: Response) => {
  const {
    fullName,
    studio,
    nationality,
    username,
    password,
    email,
    recieveEmail,
  }: Iseller = req.body;
  if (
    !fullName ||
    !studio ||
    !nationality ||
    !username ||
    !password ||
    !email
  ) {
    throw new Unathenticated("all inputs are required");
  }
  const newSeller: Iseller = {
    fullName,
    studio,
    nationality,
    username,
    password,
    email,
    recieveEmail,
  };

  const user = await User.findByUsername(email);
  if (user) {
    throw new BadRequest("a user already existed with this email");
  }

  const seller = await Seller.createSeller(newSeller);
  if (!seller) {
    throw new serverError("an error occured please try again");
  }

  const token = seller.createToken();
  if (!token) {
    throw new serverError("an error occured please try again");
  }

  return res
    .status(200)
    .cookie("token", token, TokenOption)
    .json({ userLoggedIn: true });
};

const userSignup = async (req: Request, res: Response) => {
  const { username, password, email, recieveEmail }: Iuser = req.body;
  if (!username || !password || !email) {
    throw new Unathenticated("all inputs are required");
  }
  const newUser: Iuser = {
    username,
    email,
    password,
    recieveEmail,
  };
  const seller = await Seller.findByUsername(email);
  if (seller) {
    throw new BadRequest("a user already existed with this email");
  }
  const user = await User.createUser(newUser);
  if (!user) {
    throw new serverError("an error occured please try again");
  }

  const token = user.createToken();
  if (!token) {
    throw new serverError("an error occured please try again");
  }

  return res
    .status(200)
    .cookie("token", token, TokenOption)
    .json({ userLoggedIn: true });
};

export default { Login, sellerSignup, userSignup };
