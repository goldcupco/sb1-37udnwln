-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE transmission_type AS ENUM ('automatic', 'manual');
CREATE TYPE fuel_type AS ENUM ('gasoline', 'diesel', 'electric', 'hybrid');
CREATE TYPE car_category AS ENUM ('economy', 'compact', 'luxury', 'suv', 'van');
CREATE TYPE car_status AS ENUM ('available', 'rented', 'maintenance', 'reserved');
CREATE TYPE membership_status AS ENUM ('regular', 'premium', 'vip');
CREATE TYPE payment_type AS ENUM ('credit_card', 'debit_card', 'paypal');
CREATE TYPE rental_status AS ENUM ('scheduled', 'active', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded');
CREATE TYPE maintenance_type AS ENUM ('routine', 'repair', 'inspection');
CREATE TYPE maintenance_status AS ENUM ('scheduled', 'in_progress', 'completed');
CREATE TYPE insurance_type AS ENUM ('basic', 'premium', 'full');
CREATE TYPE location_type AS ENUM ('airport', 'city', 'suburban');

-- Locations table (needs to be created first as it's referenced by cars)
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type location_type NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    operating_hours JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Customers table (needs to be created before payment_methods and rentals)
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    driver_license_number VARCHAR(50) UNIQUE NOT NULL,
    driver_license_state VARCHAR(50) NOT NULL,
    driver_license_expiry DATE NOT NULL,
    date_of_birth DATE NOT NULL,
    membership_status membership_status NOT NULL DEFAULT 'regular',
    registration_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Cars table (depends on locations)
CREATE TABLE cars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    license_plate VARCHAR(20) UNIQUE NOT NULL,
    vin VARCHAR(17) UNIQUE NOT NULL,
    color VARCHAR(50) NOT NULL,
    mileage DECIMAL(10,2) NOT NULL,
    transmission transmission_type NOT NULL,
    fuel_type fuel_type NOT NULL,
    category car_category NOT NULL,
    daily_rate DECIMAL(10,2) NOT NULL,
    status car_status NOT NULL DEFAULT 'available',
    features TEXT[] NOT NULL DEFAULT '{}',
    last_maintenance_date DATE,
    location_id UUID REFERENCES locations(id),
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Payment Methods table (depends on customers)
CREATE TABLE payment_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    type payment_type NOT NULL,
    provider VARCHAR(100) NOT NULL,
    last_four_digits VARCHAR(4),
    expiry_date DATE,
    is_default BOOLEAN NOT NULL DEFAULT false,
    billing_street VARCHAR(255) NOT NULL,
    billing_city VARCHAR(100) NOT NULL,
    billing_state VARCHAR(100) NOT NULL,
    billing_zip_code VARCHAR(20) NOT NULL,
    billing_country VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Rentals table (depends on cars, customers, and locations)
CREATE TABLE rentals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID NOT NULL REFERENCES cars(id),
    customer_id UUID NOT NULL REFERENCES customers(id),
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    pickup_location_id UUID NOT NULL REFERENCES locations(id),
    return_location_id UUID NOT NULL REFERENCES locations(id),
    status rental_status NOT NULL DEFAULT 'scheduled',
    base_rate DECIMAL(10,2) NOT NULL,
    insurance_rate DECIMAL(10,2) NOT NULL,
    extra_driver_fee DECIMAL(10,2),
    gps_fee DECIMAL(10,2),
    child_seat_fee DECIMAL(10,2),
    total_amount DECIMAL(10,2) NOT NULL,
    payment_status payment_status NOT NULL DEFAULT 'pending',
    mileage_start INTEGER NOT NULL,
    mileage_end INTEGER,
    fuel_level_start DECIMAL(3,2) NOT NULL,
    fuel_level_end DECIMAL(3,2),
    notes TEXT,
    insurance_type insurance_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Maintenance Records table (depends on cars)
CREATE TABLE maintenance_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID NOT NULL REFERENCES cars(id),
    type maintenance_type NOT NULL,
    date DATE NOT NULL,
    description TEXT NOT NULL,
    cost DECIMAL(10,2) NOT NULL,
    mileage INTEGER NOT NULL,
    technician VARCHAR(255) NOT NULL,
    parts JSONB,
    status maintenance_status NOT NULL DEFAULT 'scheduled',
    next_maintenance_due DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insurance Policies table (depends on rentals)
CREATE TABLE insurance_policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rental_id UUID NOT NULL REFERENCES rentals(id),
    type insurance_type NOT NULL,
    coverage JSONB NOT NULL,
    daily_rate DECIMAL(10,2) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    policy_number VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    terms TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_cars_status ON cars(status);
CREATE INDEX idx_cars_category ON cars(category);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_rentals_status ON rentals(status);
CREATE INDEX idx_rentals_dates ON rentals(start_date, end_date);
CREATE INDEX idx_maintenance_car_id ON maintenance_records(car_id);
CREATE INDEX idx_maintenance_status ON maintenance_records(status);
CREATE INDEX idx_locations_city_state ON locations(city, state);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cars_updated_at
    BEFORE UPDATE ON cars
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON customers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_locations_updated_at
    BEFORE UPDATE ON locations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_methods_updated_at
    BEFORE UPDATE ON payment_methods
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rentals_updated_at
    BEFORE UPDATE ON rentals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_maintenance_records_updated_at
    BEFORE UPDATE ON maintenance_records
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_insurance_policies_updated_at
    BEFORE UPDATE ON insurance_policies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();