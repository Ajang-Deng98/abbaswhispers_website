// Image utility functions for handling image loading and fallbacks

export const handleImageError = (e) => {
  e.target.style.display = 'none';
  
  // Create a fallback div if it doesn't exist
  if (!e.target.nextElementSibling || !e.target.nextElementSibling.classList.contains('image-fallback')) {
    const fallback = document.createElement('div');
    fallback.className = 'image-fallback';
    fallback.style.cssText = `
      width: ${e.target.style.width || '100%'};
      height: ${e.target.style.height || '200px'};
      background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6b7280;
      font-size: 14px;
      border-radius: 8px;
      border: 2px dashed #d1d5db;
    `;
    fallback.textContent = 'Image not available';
    e.target.parentNode.insertBefore(fallback, e.target.nextSibling);
  }
};

export const getImageSrc = (imagePath, baseUrl = '') => {
  if (!imagePath) return null;
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it's a relative path, prepend the base URL
  if (baseUrl && !imagePath.startsWith('/')) {
    return `${baseUrl}/${imagePath}`;
  }
  
  return imagePath;
};

export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};