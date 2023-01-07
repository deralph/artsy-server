import multer from "multer";
import { v2 } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

v2.config({
  cloud_name: process.env.CLOUDINARY_HOST,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage: CloudinaryStorage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "artsy",
    format: async () => "png",
    public_id: (req, file) => file.filename,
  },
});

// using CloudinaryStorage in typescript

const parser = multer({ storage: storage });

export default parser;
