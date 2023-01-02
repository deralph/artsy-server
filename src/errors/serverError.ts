import { StatusCodes } from "http-status-codes";
import CustomError from "./custom";

// interface Employee {
//   message: String;
//   statusCode: Number;
// }

class serverError extends CustomError {
  public status: number;
  public message: string;
  constructor(message: string, status?: number) {
    super(message);
    this.status = StatusCodes.INTERNAL_SERVER_ERROR;
    this.message = message;
  }
  //   constructor(message: string, statusCode: Number = StatusCodes.UNAUTHORIZED) {
  // super(message);
  // this.statusCode = StatusCodes.UNAUTHORIZED;
  //   }
}

export default serverError;
