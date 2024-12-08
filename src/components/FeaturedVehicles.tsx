import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getFeaturedVehicles() {
  const { data } = await supabase
    .from('cars')
    .select('*')
    .eq('status', 'available')
    .limit(6)
  return data
}

export default async function FeaturedVehicles() {
  const vehicles = await getFeaturedVehicles()

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-gray-900">Featured Vehicles</h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles?.map((vehicle) => (
          <Link 
            key={vehicle.id} 
            href={`/vehicles/${vehicle.id}`}
            className="group"
          >
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={vehicle.image_url || '/images/car-placeholder.jpg'}
                alt={`${vehicle.make} ${vehicle.model}`}
                width={400}
                height={300}
                className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="text-xl font-semibold text-white">
                  {vehicle.make} {vehicle.model}
                </h3>
                <p className="mt-2 text-white">
                  From ${vehicle.daily_rate}/day
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}