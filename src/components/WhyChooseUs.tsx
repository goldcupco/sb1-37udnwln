import { 
  ShieldCheckIcon, 
  CurrencyDollarIcon, 
  ClockIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Quality Guaranteed',
    description: 'All our vehicles undergo rigorous maintenance checks for your safety and comfort.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Best Price Guarantee',
    description: 'We offer competitive rates and price matching to ensure you get the best deal.',
    icon: CurrencyDollarIcon,
  },
  {
    name: '24/7 Support',
    description: 'Our customer service team is available around the clock to assist you.',
    icon: ClockIcon,
  },
  {
    name: 'Convenient Locations',
    description: 'Multiple pickup and drop-off locations for your convenience.',
    icon: MapPinIcon,
  },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            Experience the difference with our premium car rental service
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.name} className="text-center">
              <div className="mx-auto h-12 w-12">
                <feature.icon className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">
                {feature.name}
              </h3>
              <p className="mt-2 text-base text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}