import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Premium Car Rentals | Your Trusted Car Rental Service',
    template: '%s | Premium Car Rentals'
  },
  description: 'Find and rent your perfect car from our premium selection. Best rates guaranteed, flexible pickup locations, and exceptional service.',
  keywords: ['car rental', 'vehicle rental', 'luxury cars', 'rent a car', 'car hire', 'premium vehicles', 'SUV rental', 'business car rental'],
  openGraph: {
    title: 'Premium Car Rentals | Your Trusted Car Rental Service',
    description: 'Find and rent your perfect car from our premium selection. Best rates guaranteed, flexible pickup locations, and exceptional service.',
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}