export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  driverLicense: {
    number: string;
    state: string;
    expiryDate: Date;
  };
  dateOfBirth: Date;
  membershipStatus: 'regular' | 'premium' | 'vip';
  registrationDate: Date;
  paymentMethods: PaymentMethod[];
  rentalHistory: string[]; // Array of rental IDs
}