import express from "express";
import multer from "multer";
import artUpload from "../controllers/Arts";
import parser from "../middlewares/cloudinary.config";

const upload = multer();
const Router = express.Router();

// Router.post("/upload", parser.single("image"), artUpload);
// Router.post("/upload", upload.none(), artUpload);
Router.post("/upload", parser.single("image"), artUpload);

export default Router;
