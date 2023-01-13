import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// declare var process: {
//   env: {
//     CLOUDINARY_HOST:String;
//     CLOUDINARY_API_KEY:String;
//     CLOUDINARY_API_SECRET:String;
//   };
// };

const { CLOUDINARY_HOST, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

console.log(CLOUDINARY_HOST, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name: CLOUDINARY_HOST,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const storage: CloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  // folder:'artsy'
  params: {
    // format: async () => "png",
    public_id: (req, file) => file.filename,
    // folder: "artsy",
  },
});

// using CloudinaryStorage in typescript

const parser = multer({ storage });

export default parser;
