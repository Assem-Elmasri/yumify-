// Cloudinary upload middleware (use this when CLOUDINARY_CLOUD_NAME is set)
import multer from "multer";
import { cloudinaryStorage } from "../utils/cloudinary.util.js";

export const upload = multer({
  storage: cloudinaryStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp/;
    const extname = file.originalname.toLowerCase().match(/\.(jpeg|jpg|png|webp)$/);
    const mimetype = fileTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed (jpeg, jpg, png, webp)"));
    }
  },
});

export default upload;

