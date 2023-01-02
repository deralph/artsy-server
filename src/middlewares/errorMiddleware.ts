import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import CustomError from "../errors/custom";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log("you have an error");
  console.log(err);
  // let customError = err;

  //   if (!(err instanceof CustomError)) {
  //     customError = new CustomError(
  //       'Oh no, this is embarrasing. We are having troubles my friend'
  //     );
  //   }

  //     const error:error = {
  //         message:err.message,
  //         statusCode:err.statusCode
  // }

  return res.status(err.status).json({
    message: err.message || "you have unkown errors",
    status: err.status || 500,
  });
};

export default errorHandler;
