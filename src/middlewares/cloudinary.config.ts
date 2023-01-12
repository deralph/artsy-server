import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: "dyvpxtoqc",
  api_key: "253766466748743",
  api_secret: "JRe3INr0nESG2S7FAMxjHKHsfVc",
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
