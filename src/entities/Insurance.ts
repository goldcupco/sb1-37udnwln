export interface Insurance {
  id: string;
  rentalId: string;
  type: 'basic' | 'premium' | 'full';
  coverage: {
    liability: number;
    collision: number;
    personal: number;
  };
  dailyRate: number;
  provider: string;
  policyNumber: string;
  startDate: Date;
  endDate: Date;
  terms: string[];
}