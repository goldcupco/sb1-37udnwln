'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

export default function SearchForm() {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [pickupDate, setPickupDate] = useState<Date | null>(null)
  const [returnDate, setReturnDate] = useState<Date | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (location && pickupDate && returnDate) {
      router.push(`/vehicles?location=${location}&pickup=${pickupDate.toISOString()}&return=${returnDate.toISOString()}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6" id="search">
      <div className="grid gap-6 md:grid-cols-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pickup Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select location</option>
            <option value="nyc">New York City</option>
            <option value="lax">Los Angeles</option>
            <option value="chi">Chicago</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pickup Date
          </label>
          <DatePicker
            selected={pickupDate}
            onChange={setPickupDate}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            minDate={new Date()}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Return Date
          </label>
          <DatePicker
            selected={returnDate}
            onChange={setReturnDate}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            minDate={pickupDate || new Date()}
            required
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-3 px-4 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search Vehicles
          </button>
        </div>
      </div>
    </form>
  )
}