import express, {
  Application,
  Request,
  Response,
  NextFunction,
  json,
} from "express";

import "express-async-errors";
import { config } from "dotenv";
// import asyncError    rom 'express-async-errors'
import connectDB from "./connect";
import NotFound from "./middlewares/notFound";
import errorHandler from "./middlewares/errorMiddleware";
import authRouter from "./routes/user";

config();
// asyncError()
// require("express-async-errors");

const mongoUri: any = process.env.MONGO_URI;

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(json());

app.get("/ap1/v1/", (req: Request, res: Response) => {
  res.send("you are in this forever");
});

app.use("/api/v1/auth", authRouter);
app.use(errorHandler);
app.use(NotFound);

const start = async () => {
  try {
    console.log(mongoUri);
    await connectDB(mongoUri);
    console.log("inside db");
    app.listen(port, () => console.log(`server listening at port ${port}`));
  } catch (error) {
    console.log("connect error");
    console.log(error);
  }
};

start();