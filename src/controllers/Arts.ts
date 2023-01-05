import Arts from "../models/arts";

const artUpload = async (req: Request, res: Response) => {
  interface Decoded extends Request {
    file: {
      path: any;
    };
  }

  const imageUpload = new Arts({
    image: (req as Decoded).file.path,
  });

  try {
    await imageUpload.save();
  } catch (error) {
    console.log(error);
    // return res.status(400).json({status:'error',message:`image upload failed check to see the ${error}`})
  }
};

export default artUpload;
