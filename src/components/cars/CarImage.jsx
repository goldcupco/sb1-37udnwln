import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageWithFallback from '../common/ImageWithFallback';
import { getCarImagePath, getFallbackImage, preloadCarImages } from '../../utils/imageUtils';

const CarImage = ({ make, model, className, priority = false }) => {
  const [isLoading, setIsLoading] = useState(priority);

  useEffect(() => {
    if (priority) {
      preloadCarImages(make, model)
        .finally(() => setIsLoading(false));
    }
  }, [make, model, priority]);

  if (isLoading) {
    return <div className={`${className} bg-gray-200 animate-pulse`} />;
  }

  return (
    <ImageWithFallback
      src={getCarImagePath(make, model)}
      fallbackSrc={getFallbackImage()}
      alt={`${make} ${model}`}
      className={className}
      loading={priority ? "eager" : "lazy"}
    />
  );
};

CarImage.propTypes = {
  make: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  className: PropTypes.string,
  priority: PropTypes.bool
};

export default CarImage;