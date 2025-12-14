import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create Cloudinary storage for Multer
export const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = 'uploads';
    
    if (req.baseUrl.includes('/foods')) {
      folder = 'foods';
    } else if (req.baseUrl.includes('/user')) {
      folder = 'users';
    }
    
    return {
      folder: folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [
        { width: 800, height: 800, crop: 'limit' }, // Resize large images
        { quality: 'auto' }, // Optimize quality
      ],
    };
  },
});

// Helper function to get image URL
export const getCloudinaryUrl = (publicId) => {
  if (!publicId) return null;
  
  // If it's already a full URL, return as is
  if (publicId.startsWith('http')) {
    return publicId;
  }
  
  // Return Cloudinary URL
  return cloudinary.url(publicId, {
    secure: true,
    transformation: [{ width: 800, height: 800, crop: 'limit' }],
  });
};

export default cloudinary;

