import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_HOST,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const storage: CloudinaryStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "artsy",
//     format: async () => "png",
//     public_id: (req, file) => file.filename,
//   },
// });

// using CloudinaryStorage in typescript

const parser = multer({ dest: "uploads/" });

export default parser;
