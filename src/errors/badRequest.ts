import { StatusCodes } from "http-status-codes";
import CustomError from "./custom";

class BadRequest extends CustomError {
  public status: number;
  public message: string;
  constructor(message: string, status?: number) {
    super(message);
    this.status = StatusCodes.BAD_REQUEST;
    this.message = message;
  }

  //   constructor(message: string, statusCode: Number = StatusCodes.BAD_REQUEST) {
  //     super(message);
  //   }
}

export default BadRequest;
