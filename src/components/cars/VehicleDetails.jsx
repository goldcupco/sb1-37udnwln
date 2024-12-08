import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';
import CarImage from './CarImage';

export default function VehicleDetails({ car }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = () => {
    setIsLoading(true);
    navigate(`/reservation/${car.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-[16/9]">
        <CarImage
          make={car.make}
          model={car.model}
          className="w-full h-full object-cover"
          priority={true}
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {car.make} {car.model} {car.year}
        </h2>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Category</h3>
            <p className="mt-1 text-sm text-gray-900">{car.category}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Transmission</h3>
            <p className="mt-1 text-sm text-gray-900">{car.transmission}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Fuel Type</h3>
            <p className="mt-1 text-sm text-gray-900">{car.fuel_type}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Daily Rate</h3>
            <p className="mt-1 text-lg font-bold text-gray-900">
              {formatCurrency(car.daily_rate)}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500">Features</h3>
          <ul className="mt-2 grid grid-cols-2 gap-2">
            {car.features.map((feature) => (
              <li key={feature} className="text-sm text-gray-900">
                • {feature}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleSelect}
          disabled={isLoading || car.status !== 'available'}
          className={`mt-6 w-full rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm 
            ${car.status === 'available' 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-gray-400 cursor-not-allowed'}`}
        >
          {isLoading ? 'Processing...' : 'Select Vehicle'}
        </button>
      </div>
    </div>
  );
}

VehicleDetails.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.string.isRequired,
    make: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    transmission: PropTypes.string.isRequired,
    fuel_type: PropTypes.string.isRequired,
    daily_rate: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};