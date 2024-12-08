const BASE_IMAGE_PATH = '/images/cars';
const IMAGE_CACHE = new Map();

export const getCarImagePath = (make, model) => {
  const cacheKey = `${make}-${model}`;
  
  if (IMAGE_CACHE.has(cacheKey)) {
    return IMAGE_CACHE.get(cacheKey);
  }
  
  const formattedMake = make.toLowerCase();
  const formattedModel = model.toLowerCase().replace(/\s+/g, '-');
  const path = `${BASE_IMAGE_PATH}/${formattedMake}-${formattedModel}.webp`;
  
  IMAGE_CACHE.set(cacheKey, path);
  return path;
};

export const getFallbackImage = () => `${BASE_IMAGE_PATH}/default-car.webp`;
export const getHeroImage = () => '/images/cars/hero-bg.webp';
export const getFallbackHeroImage = () => '/images/cars/fallback-hero.webp';

export const preloadImage = (src) => {
  if (typeof window === 'undefined') return Promise.resolve();
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

export const preloadImages = async (images) => {
  if (typeof window === 'undefined') return Promise.resolve([]);
  return Promise.allSettled(images.map(preloadImage));
};

export const preloadCarImages = async (make, model) => {
  const imagesToPreload = [
    getCarImagePath(make, model),
    getFallbackImage()
  ];
  return preloadImages(imagesToPreload);
};