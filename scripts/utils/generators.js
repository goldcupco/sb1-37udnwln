import { faker } from '@faker-js/faker';
import { 
  CAR_MAKES, 
  CAR_MODELS, 
  CAR_CATEGORIES, 
  FUEL_TYPES, 
  TRANSMISSION_TYPES,
  CAR_FEATURES 
} from '../../src/utils/constants.js';

export function generateLocation() {
  const locationTypes = ['airport', 'city', 'suburban'];
  const operatingHours = {
    monday: { open: '09:00', close: '18:00' },
    tuesday: { open: '09:00', close: '18:00' },
    wednesday: { open: '09:00', close: '18:00' },
    thursday: { open: '09:00', close: '18:00' },
    friday: { open: '09:00', close: '18:00' },
    saturday: { open: '10:00', close: '16:00' },
    sunday: { open: '10:00', close: '16:00' }
  };

  return {
    name: `${faker.location.city()} Branch`,
    type: faker.helpers.arrayElement(locationTypes),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zip_code: faker.location.zipCode(),
    country: 'USA',
    latitude: parseFloat(faker.location.latitude()),
    longitude: parseFloat(faker.location.longitude()),
    phone: faker.phone.number('###-###-####'),
    email: faker.internet.email(),
    operating_hours: operatingHours
  };
}

export function generateCar(locationId) {
  const make = faker.helpers.arrayElement(CAR_MAKES);
  const model = faker.helpers.arrayElement(CAR_MODELS[make]);
  const category = getCarCategory(make);

  return {
    make,
    model,
    year: faker.number.int({ min: 2020, max: 2024 }),
    license_plate: faker.helpers.fromRegExp(/[A-Z]{3}[0-9]{3}/),
    vin: faker.vehicle.vin(),
    color: faker.vehicle.color(),
    mileage: faker.number.float({ min: 1000, max: 50000, precision: 0.1 }),
    transmission: faker.helpers.arrayElement(Object.values(TRANSMISSION_TYPES)),
    fuel_type: faker.helpers.arrayElement(Object.values(FUEL_TYPES)),
    category,
    daily_rate: getDailyRate(category),
    status: faker.helpers.arrayElement(['available', 'rented', 'maintenance', 'reserved']),
    features: faker.helpers.arrayElements(CAR_FEATURES, { min: 3, max: 8 }),
    last_maintenance_date: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
    location_id: locationId,
    image_url: null // Will be handled by the image management system
  };
}

export function generateCustomer() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  
  return {
    first_name: firstName,
    last_name: lastName,
    email: faker.internet.email({ firstName, lastName }),
    phone: faker.phone.number('###-###-####'),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zip_code: faker.location.zipCode(),
    country: 'USA',
    driver_license_number: faker.helpers.fromRegExp(/[A-Z][0-9]{8}/),
    driver_license_state: faker.location.state({ abbreviated: true }),
    driver_license_expiry: faker.date.future({ years: 5 }).toISOString().split('T')[0],
    date_of_birth: faker.date.birthdate({ min: 21, max: 80, mode: 'age' }).toISOString().split('T')[0],
    membership_status: faker.helpers.arrayElement(['regular', 'premium', 'vip'])
  };
}

export function generatePaymentMethod(customerId) {
  return {
    customer_id: customerId,
    type: faker.helpers.arrayElement(['credit_card', 'debit_card', 'paypal']),
    provider: faker.helpers.arrayElement(['Visa', 'Mastercard', 'American Express', 'PayPal']),
    last_four_digits: faker.finance.creditCardNumber('####'),
    expiry_date: faker.date.future({ years: 4 }).toISOString().split('T')[0],
    is_default: faker.datatype.boolean(),
    billing_street: faker.location.streetAddress(),
    billing_city: faker.location.city(),
    billing_state: faker.location.state({ abbreviated: true }),
    billing_zip_code: faker.location.zipCode(),
    billing_country: 'USA'
  };
}

export function generateRental(carId, customerId, pickupLocationId, returnLocationId) {
  const startDate = faker.date.future({ years: 1 });
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + faker.number.int({ min: 1, max: 14 }));

  const baseRate = faker.number.float({ min: 50, max: 200, precision: 0.01 });
  const insuranceRate = baseRate * 0.15;
  const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const totalAmount = (baseRate + insuranceRate) * days;

  return {
    car_id: carId,
    customer_id: customerId,
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
    pickup_location_id: pickupLocationId,
    return_location_id: returnLocationId,
    status: faker.helpers.arrayElement(['scheduled', 'active', 'completed', 'cancelled']),
    base_rate: baseRate,
    insurance_rate: insuranceRate,
    total_amount: totalAmount,
    payment_status: faker.helpers.arrayElement(['pending', 'paid', 'refunded']),
    mileage_start: faker.number.int({ min: 1000, max: 50000 }),
    fuel_level_start: 1.0,
    insurance_type: faker.helpers.arrayElement(['basic', 'premium', 'full'])
  };
}

export function generateInsurance(rentalId) {
  const type = faker.helpers.arrayElement(['basic', 'premium', 'full']);
  const coverage = {
    liability: faker.number.int({ min: 50000, max: 500000 }),
    collision: faker.number.int({ min: 25000, max: 100000 }),
    personal: faker.number.int({ min: 5000, max: 50000 })
  };

  return {
    rental_id: rentalId,
    type,
    coverage,
    daily_rate: faker.number.float({ min: 10, max: 50, precision: 0.01 }),
    provider: faker.helpers.arrayElement(['SafeGuard', 'TotalCover', 'SecureRide']),
    policy_number: faker.helpers.fromRegExp(/POL-[A-Z]{2}[0-9]{6}/),
    start_date: faker.date.future({ years: 1 }).toISOString().split('T')[0],
    end_date: faker.date.future({ years: 1, refDate: new Date().setFullYear(new Date().getFullYear() + 1) }).toISOString().split('T')[0],
    terms: faker.helpers.arrayElements([
      'Collision coverage',
      'Liability protection',
      'Personal injury protection',
      'Roadside assistance',
      'Glass coverage'
    ], { min: 2, max: 5 })
  };
}

export function generateMaintenance(carId) {
  const parts = Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => ({
    name: faker.helpers.arrayElement([
      'Oil filter',
      'Air filter',
      'Brake pads',
      'Tires',
      'Battery',
      'Spark plugs'
    ]),
    cost: faker.number.float({ min: 20, max: 500, precision: 0.01 }),
    quantity: faker.number.int({ min: 1, max: 4 })
  }));

  return {
    car_id: carId,
    type: faker.helpers.arrayElement(['routine', 'repair', 'inspection']),
    date: faker.date.recent({ days: 90 }).toISOString().split('T')[0],
    description: faker.lorem.sentence(),
    cost: faker.number.float({ min: 100, max: 2000, precision: 0.01 }),
    mileage: faker.number.int({ min: 1000, max: 50000 }),
    technician: faker.person.fullName(),
    parts,
    status: faker.helpers.arrayElement(['scheduled', 'in_progress', 'completed']),
    next_maintenance_due: faker.date.future({ years: 1 }).toISOString().split('T')[0],
    notes: faker.lorem.paragraph()
  };
}

function getCarCategory(make) {
  const luxuryBrands = ['BMW', 'Mercedes', 'Audi', 'Lexus'];
  if (luxuryBrands.includes(make)) return CAR_CATEGORIES.LUXURY;
  return faker.helpers.arrayElement([
    CAR_CATEGORIES.ECONOMY,
    CAR_CATEGORIES.COMPACT,
    CAR_CATEGORIES.SUV
  ]);
}

function getDailyRate(category) {
  const baseRates = {
    [CAR_CATEGORIES.ECONOMY]: { min: 30, max: 50 },
    [CAR_CATEGORIES.COMPACT]: { min: 40, max: 60 },
    [CAR_CATEGORIES.LUXURY]: { min: 100, max: 200 },
    [CAR_CATEGORIES.SUV]: { min: 70, max: 120 },
    [CAR_CATEGORIES.VAN]: { min: 80, max: 150 }
  };

  const rate = baseRates[category] || baseRates[CAR_CATEGORIES.ECONOMY];
  return faker.number.float({ min: rate.min, max: rate.max, precision: 0.01 });
}