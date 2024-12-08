import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';
import CarCard from '../components/cars/CarCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

export default function VehicleList() {
  const [searchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      let query = supabase
        .from('cars')
        .select('*');

      // Apply filters from search params
      const location = searchParams.get('location');
      const pickup = searchParams.get('pickup');
      const returnDate = searchParams.get('return');

      if (location) {
        query = query.eq('location_id', location);
      }

      if (pickup && returnDate) {
        // Add availability check logic here
        query = query.eq('status', 'available');
      }

      const { data, error } = await query;

      if (!error && data) {
        setVehicles(data);
      }
      setLoading(false);
    }

    fetchVehicles();
  }, [searchParams]);

  if (loading) {
    return <LoadingSkeleton count={6} />;
  }

  return (
    <>
      <Helmet>
        <title>Available Vehicles | Premium Car Rentals</title>
        <meta 
          name="description" 
          content="Browse our selection of premium rental cars. Find the perfect vehicle for your needs." 
        />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Vehicles</h1>
        
        {vehicles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No vehicles available for the selected criteria.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle, index) => (
              <CarCard 
                key={vehicle.id} 
                car={vehicle}
                priority={index < 6} // Prioritize loading first 6 images
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}