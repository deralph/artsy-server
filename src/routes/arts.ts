import express from "express";
import multer from "multer";
import controllers from "../controllers/Arts";
import parser from "../middlewares/cloudinary.config";

const upload = multer();
const Router = express.Router();

const { artUpload, cloudGet } = controllers;
// Router.post("/upload", parser.single("image"), artUpload);
// Router.post("/upload", upload.none(), artUpload);
Router.post("/upload", parser.single("image"), artUpload);
Router.get("/upload", cloudGet);

export default Router;
