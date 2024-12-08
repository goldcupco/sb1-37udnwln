import HeroImage from './common/HeroImage';

export default function Hero() {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <HeroImage className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gray-500 mix-blend-multiply" />
      </div>
      <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Experience Luxury on Every Journey
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-gray-100">
          Choose from our premium fleet of vehicles. Whether it's a business trip or a weekend getaway,
          we have the perfect car for every occasion.
        </p>
        <div className="mt-10">
          <a
            href="#search"
            className="inline-flex items-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-blue-600 shadow-sm hover:bg-blue-50"
          >
            Find Your Perfect Car
          </a>
        </div>
      </div>
    </div>
  );
}