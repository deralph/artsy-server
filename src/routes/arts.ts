import express from "express";
import artUpload from "../controllers/Arts";
import parser from "../middlewares/cloudinary.config";

const Router = express.Router();

// Router.post("/upload", parser.single("image"), artUpload);
Router.post("/upload", artUpload);

export default Router;
