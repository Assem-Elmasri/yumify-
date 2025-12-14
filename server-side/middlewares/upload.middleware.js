
import multer from "multer"; // Import Multer for handling file uploads
import path from "path"; // Import path module for handling file paths

// Setup local storage (default)
const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.baseUrl.includes('/foods')) {
      cb(null, "uploads/foods");
    } else if (req.baseUrl.includes('/user')) {
      cb(null, "uploads/users");
    } else {
      cb(new Error('invalid path route'));
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// For now, use local storage
// To enable Cloudinary, install: npm install cloudinary multer-storage-cloudinary
// Then set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
// And uncomment the Cloudinary setup below

let storage = localStorage;

// Cloudinary setup (uncomment when ready to use)
/*
if (process.env.CLOUDINARY_CLOUD_NAME) {
  try {
    const { cloudinaryStorage } = await import("../utils/cloudinary.util.js");
    storage = cloudinaryStorage;
    console.log("Using Cloudinary for image storage");
  } catch (error) {
    console.error("Failed to load Cloudinary, using local storage:", error);
    storage = localStorage;
  }
} else {
  console.log("Using local file storage (uploads directory)");
  storage = localStorage;
}
*/

console.log("Using local file storage (uploads directory)");

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp/;
    const extname = path.extname(file.originalname).toLowerCase();
    if (fileTypes.test(extname) && fileTypes.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed (jpeg, jpg, png, webp)"));
    }
  },
});

export default upload;