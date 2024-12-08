export interface Maintenance {
  id: string;
  carId: string;
  type: 'routine' | 'repair' | 'inspection';
  date: Date;
  description: string;
  cost: number;
  mileage: number;
  technician: string;
  parts?: {
    name: string;
    cost: number;
    quantity: number;
  }[];
  status: 'scheduled' | 'in_progress' | 'completed';
  nextMaintenanceDue?: Date;
  notes?: string;
}