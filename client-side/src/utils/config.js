// Configuration constants for API and asset URLs
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
export const UPLOADS_BASE_URL = import.meta.env.VITE_UPLOADS_BASE_URL || 'http://localhost:5000/uploads';

// Helper function to get full image URL
// Handles both Cloudinary URLs (full URLs) and local storage paths
export const getImageUrl = (imageUrl, type = 'foods') => {
  if (!imageUrl) return null;
  
  // If it's already a full URL (Cloudinary), return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // For local storage, construct URL
  return `${UPLOADS_BASE_URL}/${type}/${imageUrl}`;
};

