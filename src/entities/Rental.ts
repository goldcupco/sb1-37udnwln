export interface Rental {
  id: string;
  carId: string;
  customerId: string;
  startDate: Date;
  endDate: Date;
  pickupLocation: string;
  returnLocation: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  baseRate: number;
  additionalCharges: {
    insurance: number;
    extraDriver?: number;
    gps?: number;
    childSeat?: number;
  };
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  mileageStart: number;
  mileageEnd?: number;
  fuelLevelStart: number;
  fuelLevelEnd?: number;
  notes?: string;
  insuranceType: 'basic' | 'premium' | 'full';
}