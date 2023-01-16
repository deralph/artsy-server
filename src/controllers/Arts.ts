import Arts from "../models/arts";
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

interface Decoded extends Request {
  user: {
    userId: String;
    username: String;
    email: String;
  };
}
const artUpload = async (req: Request, res: Response) => {
  console.log((req as Decoded).user);
  console.log("in art upload");
  console.log("req body");
  console.log(req.body);
  console.log("req file");
  console.log(req.file);
  console.log(req.file?.path);

  const { artName, description, category, size, price } = req.body;
  const imageUpload = new Arts({
    sellerId: (req as Decoded).user?.userId,
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
    cloudinary.uploader.destroy(req.file?.filename!, function (err, result) {
      console.log(result);
    });
    console.log(error);
    return res.status(400).json({
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

const checkMiddleware = (req: Request, res: Response) => {
  console.log((req as Decoded).user);
};

export default { artUpload, cloudGet, checkMiddleware };
