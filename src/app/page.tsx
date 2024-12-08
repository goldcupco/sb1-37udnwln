import { Metadata } from 'next'
import Hero from '@/components/Hero'
import SearchForm from '@/components/SearchForm'
import FeaturedVehicles from '@/components/FeaturedVehicles'
import WhyChooseUs from '@/components/WhyChooseUs'

export const metadata: Metadata = {
  title: 'Premium Car Rentals | Find Your Perfect Ride',
  description: 'Discover our premium selection of rental cars. From luxury vehicles to economy cars, find the perfect ride for your needs. Best rates guaranteed.',
}

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative -mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white shadow-lg">
          <SearchForm />
        </div>
      </div>
      <FeaturedVehicles />
      <WhyChooseUs />
    </>
  )
}