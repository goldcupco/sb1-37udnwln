import ImageWithFallback from './ImageWithFallback';
import { getHeroImage, getFallbackHeroImage } from '../../utils/imageUtils';

const HeroImage = ({ className }) => {
  return (
    <ImageWithFallback
      src={getHeroImage()}
      fallbackSrc={getFallbackHeroImage()}
      alt="Luxury car rental"
      className={className}
    />
  );
};

export default HeroImage;