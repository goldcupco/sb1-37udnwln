import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function LocationMap({ locations, onLocationSelect }) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!window.google || !locations.length) return;

    const bounds = new window.google.maps.LatLngBounds();
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 4,
      center: { lat: 39.8283, lng: -98.5795 }, // Center of USA
      mapTypeControl: false,
      streetViewControl: false
    });

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    locations.forEach(location => {
      const position = {
        lat: parseFloat(location.latitude),
        lng: parseFloat(location.longitude)
      };

      const marker = new window.google.maps.Marker({
        position,
        map,
        title: location.name
      });

      marker.addListener('click', () => {
        onLocationSelect(location.id);
      });

      bounds.extend(position);
      markersRef.current.push(marker);
    });

    // Fit map to show all markers
    if (locations.length > 1) {
      map.fitBounds(bounds);
    } else if (locations.length === 1) {
      map.setCenter(bounds.getCenter());
      map.setZoom(12);
    }
  }, [locations, onLocationSelect]);

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-md">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}

LocationMap.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  })).isRequired,
  onLocationSelect: PropTypes.func.isRequired
};