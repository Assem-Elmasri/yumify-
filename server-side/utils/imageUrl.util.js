// Helper function to get image URL from uploaded file
// Works with both local storage and Cloudinary

export const getImageUrl = (file) => {
  if (!file) return null;
  
  // Cloudinary returns file.path or file.public_id
  if (file.path) {
    // Cloudinary URL - return as is (already a full URL)
    return file.path;
  }
  
  // Local storage returns file.filename
  if (file.filename) {
    return file.filename;
  }
  
  return null;
};

// Helper to get full image URL for frontend
export const getFullImageUrl = (imageUrl, type = 'foods') => {
  if (!imageUrl) return null;
  
  // If it's already a full URL (Cloudinary), return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // For local storage, construct URL
  const baseUrl = process.env.BACKEND_URL || 
    (process.env.NODE_ENV === 'production' 
      ? `https://${process.env.RENDER_SERVICE_NAME || 'yumify-backend'}.onrender.com`
      : 'http://localhost:5000');
  
  return `${baseUrl}/uploads/${type}/${imageUrl}`;
};

