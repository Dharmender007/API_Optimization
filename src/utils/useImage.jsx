import { useState, useEffect } from 'react';

// Custom useImage hook for multiple images
function useImages(srcs) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Create an array to hold the loaded images
    const loadedImages = [];

    // Function to load each image
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
      });
    };

    // Load all images concurrently
    const loadImages = async () => {
      try {
        const loadedImgs = await Promise.all(srcs.map(loadImage));
        setImages(loadedImgs);  // Set loaded images to state
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    // Only load images when `srcs` changes
    if (srcs.length > 0) {
      loadImages();
    }

  }, [srcs]);

  return images;
}

export default useImages;

