export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin: string;
  color: string;
  mileage: number;
  transmission: 'automatic' | 'manual';
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  category: 'economy' | 'compact' | 'luxury' | 'suv' | 'van';
  dailyRate: number;
  status: 'available' | 'rented' | 'maintenance' | 'reserved';
  features: string[];
  lastMaintenanceDate: Date;
  location: string;
  imageUrl?: string;
}