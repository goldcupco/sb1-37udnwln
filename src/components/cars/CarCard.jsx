import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CarImage from './CarImage';
import { formatCurrency } from '../../utils/formatters';

const CarCard = ({ car, priority = false }) => {
  return (
    <Link 
      to={`/vehicles/${car.id}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      <div className="relative aspect-[16/9] bg-gray-100">
        <CarImage
          make={car.make}
          model={car.model}
          className="w-full h-full object-cover"
          priority={priority}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {car.make} {car.model}
        </h3>
        <p className="text-sm text-gray-500">{car.year}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">
            {formatCurrency(car.daily_rate)}<span className="text-sm font-normal">/day</span>
          </p>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {car.status}
          </span>
        </div>
      </div>
    </Link>
  );
};

CarCard.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.string.isRequired,
    make: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    daily_rate: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired
  }).isRequired,
  priority: PropTypes.bool
};

export default CarCard;