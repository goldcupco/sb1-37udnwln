export interface Location {
  id: string;
  name: string;
  type: 'airport' | 'city' | 'suburban';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  contactInfo: {
    phone: string;
    email: string;
  };
  operatingHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  availableCars: string[]; // Array of car IDs
  staff: string[]; // Array of employee IDs
}