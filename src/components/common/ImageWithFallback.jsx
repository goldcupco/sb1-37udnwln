import { useState } from 'react';
import PropTypes from 'prop-types';

const ImageWithFallback = ({ 
  src, 
  fallbackSrc, 
  alt, 
  className, 
  onLoad, 
  onError,
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
    if (onError) {
      onError();
    }
  };

  const handleLoad = () => {
    if (onLoad) {
      onLoad();
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  );
};

ImageWithFallback.propTypes = {
  src: PropTypes.string.isRequired,
  fallbackSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func
};

export default ImageWithFallback;