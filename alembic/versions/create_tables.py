"""Create tables

Revision ID: create_tables
Revises: initial_migration
Create Date: 2023-11-15 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'create_tables'
down_revision = 'initial_migration'
branch_labels = None
depends_on = None

def upgrade() -> None:
    # Create location_type enum
    op.execute("CREATE TYPE location_type AS ENUM ('airport', 'city', 'suburban')")
    op.execute("CREATE TYPE payment_type AS ENUM ('credit_card', 'debit_card', 'paypal')")
    op.execute("CREATE TYPE rental_status AS ENUM ('scheduled', 'active', 'completed', 'cancelled')")
    op.execute("CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded')")
    op.execute("CREATE TYPE maintenance_type AS ENUM ('routine', 'repair', 'inspection')")
    op.execute("CREATE TYPE maintenance_status AS ENUM ('scheduled', 'in_progress', 'completed')")
    op.execute("CREATE TYPE insurance_type AS ENUM ('basic', 'premium', 'full')")

    # Create locations table
    op.create_table(
        'locations',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('type', postgresql.ENUM('airport', 'city', 'suburban', name='location_type'), nullable=False),
        sa.Column('street', sa.String(), nullable=False),
        sa.Column('city', sa.String(), nullable=False),
        sa.Column('state', sa.String(), nullable=False),
        sa.Column('zip_code', sa.String(), nullable=False),
        sa.Column('country', sa.String(), nullable=False),
        sa.Column('latitude', sa.Float(), nullable=True),
        sa.Column('longitude', sa.Float(), nullable=True),
        sa.Column('phone', sa.String(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('operating_hours', postgresql.JSONB(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    # Create payment_methods table
    op.create_table(
        'payment_methods',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('customer_id', sa.String(), nullable=False),
        sa.Column('type', postgresql.ENUM('credit_card', 'debit_card', 'paypal', name='payment_type'), nullable=False),
        sa.Column('provider', sa.String(), nullable=False),
        sa.Column('last_four_digits', sa.String(), nullable=True),
        sa.Column('expiry_date', sa.Date(), nullable=True),
        sa.Column('is_default', sa.Boolean(), nullable=False),
        sa.Column('billing_street', sa.String(), nullable=False),
        sa.Column('billing_city', sa.String(), nullable=False),
        sa.Column('billing_state', sa.String(), nullable=False),
        sa.Column('billing_zip_code', sa.String(), nullable=False),
        sa.Column('billing_country', sa.String(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['customer_id'], ['customers.id'], ondelete='CASCADE')
    )

    # Create rentals table
    op.create_table(
        'rentals',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('car_id', sa.String(), nullable=False),
        sa.Column('customer_id', sa.String(), nullable=False),
        sa.Column('start_date', sa.DateTime(timezone=True), nullable=False),
        sa.Column('end_date', sa.DateTime(timezone=True), nullable=False),
        sa.Column('pickup_location_id', sa.String(), nullable=False),
        sa.Column('return_location_id', sa.String(), nullable=False),
        sa.Column('status', postgresql.ENUM('scheduled', 'active', 'completed', 'cancelled', name='rental_status'), nullable=False),
        sa.Column('base_rate', sa.Float(), nullable=False),
        sa.Column('insurance_rate', sa.Float(), nullable=False),
        sa.Column('extra_driver_fee', sa.Float(), nullable=True),
        sa.Column('gps_fee', sa.Float(), nullable=True),
        sa.Column('child_seat_fee', sa.Float(), nullable=True),
        sa.Column('total_amount', sa.Float(), nullable=False),
        sa.Column('payment_status', postgresql.ENUM('pending', 'paid', 'refunded', name='payment_status'), nullable=False),
        sa.Column('mileage_start', sa.Integer(), nullable=False),
        sa.Column('mileage_end', sa.Integer(), nullable=True),
        sa.Column('fuel_level_start', sa.Float(), nullable=False),
        sa.Column('fuel_level_end', sa.Float(), nullable=True),
        sa.Column('notes', sa.Text(), nullable=True),
        sa.Column('insurance_type', postgresql.ENUM('basic', 'premium', 'full', name='insurance_type'), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['car_id'], ['cars.id']),
        sa.ForeignKeyConstraint(['customer_id'], ['customers.id']),
        sa.ForeignKeyConstraint(['pickup_location_id'], ['locations.id']),
        sa.ForeignKeyConstraint(['return_location_id'], ['locations.id'])
    )

    # Create maintenance_records table
    op.create_table(
        'maintenance_records',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('car_id', sa.String(), nullable=False),
        sa.Column('type', postgresql.ENUM('routine', 'repair', 'inspection', name='maintenance_type'), nullable=False),
        sa.Column('date', sa.Date(), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('cost', sa.Float(), nullable=False),
        sa.Column('mileage', sa.Integer(), nullable=False),
        sa.Column('technician', sa.String(), nullable=False),
        sa.Column('parts', postgresql.JSONB(), nullable=True),
        sa.Column('status', postgresql.ENUM('scheduled', 'in_progress', 'completed', name='maintenance_status'), nullable=False),
        sa.Column('next_maintenance_due', sa.Date(), nullable=True),
        sa.Column('notes', sa.Text(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['car_id'], ['cars.id'])
    )

    # Create insurance_policies table
    op.create_table(
        'insurance_policies',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('rental_id', sa.String(), nullable=False),
        sa.Column('type', postgresql.ENUM('basic', 'premium', 'full', name='insurance_type'), nullable=False),
        sa.Column('coverage', postgresql.JSONB(), nullable=False),
        sa.Column('daily_rate', sa.Float(), nullable=False),
        sa.Column('provider', sa.String(), nullable=False),
        sa.Column('policy_number', sa.String(), nullable=False),
        sa.Column('start_date', sa.Date(), nullable=False),
        sa.Column('end_date', sa.Date(), nullable=False),
        sa.Column('terms', postgresql.ARRAY(sa.String()), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['rental_id'], ['rentals.id'])
    )

    # Create indexes
    op.create_index('idx_cars_status', 'cars', ['status'])
    op.create_index('idx_cars_category', 'cars', ['category'])
    op.create_index('idx_customers_email', 'customers', ['email'])
    op.create_index('idx_rentals_status', 'rentals', ['status'])
    op.create_index('idx_rentals_dates', 'rentals', ['start_date', 'end_date'])
    op.create_index('idx_maintenance_car_id', 'maintenance_records', ['car_id'])
    op.create_index('idx_maintenance_status', 'maintenance_records', ['status'])
    op.create_index('idx_locations_city_state', 'locations', ['city', 'state'])

def downgrade() -> None:
    # Drop indexes
    op.drop_index('idx_locations_city_state')
    op.drop_index('idx_maintenance_status')
    op.drop_index('idx_maintenance_car_id')
    op.drop_index('idx_rentals_dates')
    op.drop_index('idx_rentals_status')
    op.drop_index('idx_customers_email')
    op.drop_index('idx_cars_category')
    op.drop_index('idx_cars_status')

    # Drop tables
    op.drop_table('insurance_policies')
    op.drop_table('maintenance_records')
    op.drop_table('rentals')
    op.drop_table('payment_methods')
    op.drop_table('locations')

    # Drop enums
    op.execute('DROP TYPE insurance_type')
    op.execute('DROP TYPE maintenance_status')
    op.execute('DROP TYPE maintenance_type')
    op.execute('DROP TYPE payment_status')
    op.execute('DROP TYPE rental_status')
    op.execute('DROP TYPE payment_type')
    op.execute('DROP TYPE location_type')