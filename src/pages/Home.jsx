import { Link } from 'react-router-dom';
import SearchForm from '../components/SearchForm';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="/hero-bg.jpg"
            alt="Luxury car"
          />
          <div className="absolute inset-0 bg-gray-500 mix-blend-multiply" />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find Your Perfect Ride
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-gray-100">
            Choose from our premium selection of vehicles for any occasion. Book now and enjoy
            competitive rates, flexible pickup locations, and exceptional service.
          </p>
        </div>
      </div>

      {/* Search form */}
      <div className="relative -mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white shadow-lg">
          <SearchForm />
        </div>
      </div>

      {/* Featured vehicles */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-3xl font-bold text-gray-900">Featured Vehicles</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Featured vehicle cards */}
        </div>
      </div>

      {/* Why choose us */}
      <div className="bg-gray-50 mt-16">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Why Choose Us
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Features */}
          </div>
        </div>
      </div>
    </div>
  );
}