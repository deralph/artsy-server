import Arts from "../models/arts";
import { Request, Response } from "express";

const artUpload = async (req: Request, res: Response) => {
  // interface Decoded extends Request {
  //   file: {
  //     path: any;
  //   };
  // }
  console.log("in art upload");
  console.log(req.body);
  // const imageUpload = new Arts({
  //   sellerId:'1',
  //   artName:'2',
  //   image: (req as Decoded).file.path,
  //   description:'',
  //   category:'',
  //   size:'',
  //   price:'1'
  // });

  // try {
  //   await imageUpload.save();
  // } catch (error) {
  //   console.log(error);
  //   // return res.status(400).json({status:'error',message:`image upload failed check to see the ${error}`})
  // }

  res.json({ message: "file upload" });
};

export default artUpload;
