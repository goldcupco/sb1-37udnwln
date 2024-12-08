import { CAR_MAKES, CAR_MODELS } from '../../src/utils/constants';

const generateImageMap = () => {
  const map = {};
  CAR_MAKES.forEach(make => {
    CAR_MODELS[make].forEach(model => {
      const key = model;
      const formattedMake = make.toLowerCase();
      const formattedModel = model.toLowerCase().replace(/\s+/g, '-');
      map[key] = `/images/cars/${formattedMake}-${formattedModel}.jpg`;
    });
  });
  return map;
};

export const carImages = generateImageMap();
export const defaultCarImage = '/images/cars/default-car.jpg';

export function getCarImage(model) {
  return carImages[model] || defaultCarImage;
}