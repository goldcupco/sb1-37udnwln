import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import CarCard from './cars/CarCard';
import LoadingSkeleton from './common/LoadingSkeleton';

export default function FeaturedVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('status', 'available')
        .limit(6);

      if (!error && data) {
        setVehicles(data);
      }
      setLoading(false);
    }

    fetchVehicles();
  }, []);

  if (loading) {
    return <LoadingSkeleton count={6} />;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-gray-900">Featured Vehicles</h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle, index) => (
          <CarCard 
            key={vehicle.id} 
            car={vehicle}
            priority={index < 3} // Prioritize loading first 3 images
          />
        ))}
      </div>
    </section>
  );
}