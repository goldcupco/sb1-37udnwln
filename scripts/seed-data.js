import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import { generateLocation, generateCar, generateCustomer, generateRental, generateMaintenance, generateInsurance, generatePaymentMethod } from './utils/generators.js';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Generate and insert 100 locations
    console.log('Seeding locations...');
    const locations = Array.from({ length: 100 }, generateLocation);
    const { data: createdLocations, error: locationError } = await supabase
      .from('locations')
      .insert(locations)
      .select();

    if (locationError) throw locationError;
    console.log(`Created ${createdLocations.length} locations`);

    // Generate and insert 100 cars
    console.log('Seeding cars...');
    const cars = Array.from({ length: 100 }, () => 
      generateCar(faker.helpers.arrayElement(createdLocations).id)
    );
    const { data: createdCars, error: carError } = await supabase
      .from('cars')
      .insert(cars)
      .select();

    if (carError) throw carError;
    console.log('Created 100 cars');

    // Generate and insert 100 customers
    console.log('Seeding customers...');
    const customers = Array.from({ length: 100 }, generateCustomer);
    const { data: createdCustomers, error: customerError } = await supabase
      .from('customers')
      .insert(customers)
      .select();

    if (customerError) throw customerError;
    console.log('Created 100 customers');

    // Generate and insert payment methods
    console.log('Seeding payment methods...');
    const paymentMethods = createdCustomers.flatMap(customer => 
      Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
        generatePaymentMethod(customer.id)
      )
    );
    const { error: paymentError } = await supabase
      .from('payment_methods')
      .insert(paymentMethods);

    if (paymentError) throw paymentError;
    console.log('Created payment methods');

    // Generate and insert rentals
    console.log('Seeding rentals...');
    const rentals = Array.from({ length: 100 }, () => {
      const pickupLocation = faker.helpers.arrayElement(createdLocations);
      const returnLocation = Math.random() > 0.3 ? pickupLocation : faker.helpers.arrayElement(createdLocations);
      
      return generateRental(
        faker.helpers.arrayElement(createdCars).id,
        faker.helpers.arrayElement(createdCustomers).id,
        pickupLocation.id,
        returnLocation.id
      );
    });

    const { data: createdRentals, error: rentalError } = await supabase
      .from('rentals')
      .insert(rentals)
      .select();

    if (rentalError) throw rentalError;
    console.log('Created 100 rentals');

    // Generate and insert insurance policies
    console.log('Seeding insurance policies...');
    const insurancePolicies = createdRentals.map(rental => 
      generateInsurance(rental.id)
    );
    const { error: insuranceError } = await supabase
      .from('insurance_policies')
      .insert(insurancePolicies);

    if (insuranceError) throw insuranceError;
    console.log('Created insurance policies');

    // Generate and insert maintenance records
    console.log('Seeding maintenance records...');
    const maintenanceRecords = createdCars.flatMap(car =>
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        generateMaintenance(car.id)
      )
    );
    const { error: maintenanceError } = await supabase
      .from('maintenance_records')
      .insert(maintenanceRecords);

    if (maintenanceError) throw maintenanceError;
    console.log('Created maintenance records');

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();