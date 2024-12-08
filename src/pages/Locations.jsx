import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import LocationCard from '../components/locations/LocationCard';
import LocationMap from '../components/locations/LocationMap';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { groupLocationsByState } from '../utils/locationUtils';

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState('all');

  useEffect(() => {
    async function fetchLocations() {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .order('state', { ascending: true });

      if (!error && data) {
        setLocations(data);
      }
      setLoading(false);
    }

    fetchLocations();
  }, []);

  if (loading) {
    return <LoadingSkeleton count={6} />;
  }

  const groupedLocations = groupLocationsByState(locations);
  const states = ['all', ...Object.keys(groupedLocations)];
  const filteredLocations = selectedState === 'all' 
    ? locations 
    : locations.filter(loc => loc.state === selectedState);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Map Section */}
        <div className="md:w-1/2">
          <LocationMap 
            locations={filteredLocations}
            onLocationSelect={(id) => {
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>

        {/* Locations List Section */}
        <div className="md:w-1/2">
          <div className="mb-6">
            <label htmlFor="state-filter" className="block text-sm font-medium text-gray-700">
              Filter by State
            </label>
            <select
              id="state-filter"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {states.map(state => (
                <option key={state} value={state}>
                  {state === 'all' ? 'All States' : state}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-6">
            {filteredLocations.map(location => (
              <LocationCard 
                key={location.id}
                location={location}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}