export interface PaymentMethod {
  id: string;
  customerId: string;
  type: 'credit_card' | 'debit_card' | 'paypal';
  provider: string;
  lastFourDigits?: string;
  expiryDate?: Date;
  isDefault: boolean;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}