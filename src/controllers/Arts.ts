import Arts from "../models/arts";
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: "dyvpxtoqc",
  api_key: "253766466748743",
  api_secret: "JRe3INr0nESG2S7FAMxjHKHsfVc",
});

const artUpload = async (req: Request, res: Response) => {
  // interface Decoded extends Request {
  //   file: {
  //     path:unknown;
  //   };
  // }
  console.log("in art upload");
  console.log("req body");
  console.log(req.body);
  console.log("req file");
  console.log(req.file);
  console.log(req.file?.path);
  const { artName, description, category, size, price } = req.body;
  const imageUpload = new Arts({
    // sellerId:req.user?.userId,
    artName,
    image: { path: req.file?.path, id: req.file?.filename },
    description,
    category,
    size,
    price,
  });

  try {
    await imageUpload.save();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({
        status: "error",
        message: `image upload failed check to see the ${error}`,
      });
  }

  res.json({ message: "file upload", body: req.body });
};
const cloudGet = async (req: Request, res: Response) => {
  const options = {
    colors: true,
  };

  try {
    // Get details about the asset
    const result = await cloudinary.api.resource(
      "qppkir5i6etgxy0fwvpq",
      options
    );
    console.log(result);
    res.json({ result });
    return result.colors;
  } catch (error) {
    console.error(error);
  }
  return;
};

export default { artUpload, cloudGet };
