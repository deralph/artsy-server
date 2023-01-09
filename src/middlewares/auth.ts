import { Request, Response, NextFunction } from "express";

import Unauthorized from "../errors/unauthenticated";
import BadRequest from "../errors/badRequest";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface Decoded extends Request {
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
  const decoded: JwtPayload | unknown = jwt.verify(
    token,
    process.env.JWT_SECRET
  );
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

module.exports = authMiiddleware;
