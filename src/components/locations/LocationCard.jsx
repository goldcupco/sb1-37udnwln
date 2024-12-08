import PropTypes from 'prop-types';
import { formatPhoneNumber, formatOperatingHours } from '../../utils/formatters';

export default function LocationCard({ location }) {
  return (
    <div 
      id={location.id}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <h3 className="text-xl font-semibold text-gray-900">{location.name}</h3>
      <div className="mt-2 text-sm text-gray-500">
        <p>{location.street}</p>
        <p>{location.city}, {location.state} {location.zip_code}</p>
      </div>
      <div className="mt-4 space-y-2">
        <p className="text-sm">
          <span className="font-medium">Phone: </span>
          <a href={`tel:${location.phone}`} className="text-blue-600 hover:text-blue-800">
            {formatPhoneNumber(location.phone)}
          </a>
        </p>
        <p className="text-sm">
          <span className="font-medium">Email: </span>
          <a href={`mailto:${location.email}`} className="text-blue-600 hover:text-blue-800">
            {location.email}
          </a>
        </p>
      </div>
      <div className="mt-4">
        <h4 className="font-medium text-sm text-gray-900">Operating Hours</h4>
        <div className="mt-2 text-sm text-gray-500">
          {formatOperatingHours(location.operating_hours)}
        </div>
      </div>
    </div>
  );
}

LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zip_code: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    operating_hours: PropTypes.object.isRequired
  }).isRequired
};