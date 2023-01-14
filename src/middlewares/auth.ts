import { Request, Response, NextFunction } from "express";

import Unauthorized from "../errors/unauthenticated";
import BadRequest from "../errors/badRequest";
import jwt, { JwtPayload } from "jsonwebtoken";

declare var process: {
  env: {
    JWT_SECRET: string;
    // JWT_LIFETIME: string;
  };
};
interface Decoded extends Request {
  user: {
    userId: string;
    username: string;
    email: string;
  };
}
interface dataStoredInToken {
  user: {
    userId: String;
    username: String;
    email: String;
  };
}

const authMiiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.cookies.token;
  console.log(token);

  if (!token || token === "user is out") {
    throw new Unauthorized("no token available");
  }
  const decoded: JwtPayload = jwt.verify(
    token,
    process.env.JWT_SECRET
  ) as dataStoredInToken;
  console.log(decoded);
  if (!decoded) {
    throw new BadRequest("something went wrong");
  }
  (req as Decoded).user = {
    userId: decoded.userId,
    username: decoded.username,
    email: decoded.email,
  };
  next();
};

export default authMiiddleware;
