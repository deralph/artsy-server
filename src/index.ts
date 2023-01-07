import express, {
  Application,
  Request,
  Response,
  json,
  urlencoded,
} from "express";

import "express-async-errors";
import { config } from "dotenv";
import cors from "cors";
// import asyncError    rom 'express-async-errors'
import connectDB from "./connect";
import NotFound from "./middlewares/notFound";
import errorHandler from "./middlewares/errorMiddleware";
import authRouter from "./routes/user";
import artsRouter from "./routes/arts";

config();
// asyncError()
// require("express-async-errors");

const mongoUri: any = process.env.MONGO_URI;

const app: Application = express();
const port = process.env.PORT || 5000;

// declare var process: {
//   env: {
//     CLIENT_SIDE: String;
//     MONGO_URI:StriStaticOrigin | CustomOrigin | undefinedng;
//   };
// };

const origin = process.env.CLIENT_SIDE;

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(
  cors({
    // origin: function (origin, callback) {},
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.get("/api/v1/", (req: Request, res: Response) => {
  res.send("you are in this forever");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/art", artsRouter);
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
