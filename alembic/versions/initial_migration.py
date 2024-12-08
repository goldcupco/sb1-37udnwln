"""Initial migration

Revision ID: initial_migration
Revises: 
Create Date: 2023-11-15 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'initial_migration'
down_revision = None
branch_labels = None
depends_on = None

def upgrade() -> None:
    # Create enum types
    op.execute("CREATE TYPE transmission_type AS ENUM ('automatic', 'manual')")
    op.execute("CREATE TYPE fuel_type AS ENUM ('gasoline', 'diesel', 'electric', 'hybrid')")
    op.execute("CREATE TYPE car_category AS ENUM ('economy', 'compact', 'luxury', 'suv', 'van')")
    op.execute("CREATE TYPE car_status AS ENUM ('available', 'rented', 'maintenance', 'reserved')")
    op.execute("CREATE TYPE membership_status AS ENUM ('regular', 'premium', 'vip')")

    # Create cars table
    op.create_table(
        'cars',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('make', sa.String(), nullable=False),
        sa.Column('model', sa.String(), nullable=False),
        sa.Column('year', sa.Integer(), nullable=False),
        sa.Column('license_plate', sa.String(), nullable=False),
        sa.Column('vin', sa.String(), nullable=False),
        sa.Column('color', sa.String(), nullable=False),
        sa.Column('mileage', sa.Float(), nullable=False),
        sa.Column('transmission', postgresql.ENUM('automatic', 'manual', name='transmission_type'), nullable=False),
        sa.Column('fuel_type', postgresql.ENUM('gasoline', 'diesel', 'electric', 'hybrid', name='fuel_type'), nullable=False),
        sa.Column('category', postgresql.ENUM('economy', 'compact', 'luxury', 'suv', 'van', name='car_category'), nullable=False),
        sa.Column('daily_rate', sa.Float(), nullable=False),
        sa.Column('status', postgresql.ENUM('available', 'rented', 'maintenance', 'reserved', name='car_status'), nullable=False),
        sa.Column('features', postgresql.ARRAY(sa.String()), nullable=True),
        sa.Column('last_maintenance_date', sa.Date(), nullable=True),
        sa.Column('location', sa.String(), nullable=False),
        sa.Column('image_url', sa.String(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('license_plate'),
        sa.UniqueConstraint('vin')
    )

    # Create customers table
    op.create_table(
        'customers',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('first_name', sa.String(), nullable=False),
        sa.Column('last_name', sa.String(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('phone', sa.String(), nullable=False),
        sa.Column('street', sa.String(), nullable=False),
        sa.Column('city', sa.String(), nullable=False),
        sa.Column('state', sa.String(), nullable=False),
        sa.Column('zip_code', sa.String(), nullable=False),
        sa.Column('country', sa.String(), nullable=False),
        sa.Column('driver_license_number', sa.String(), nullable=False),
        sa.Column('driver_license_state', sa.String(), nullable=False),
        sa.Column('driver_license_expiry', sa.Date(), nullable=False),
        sa.Column('date_of_birth', sa.Date(), nullable=False),
        sa.Column('membership_status', postgresql.ENUM('regular', 'premium', 'vip', name='membership_status'), nullable=False),
        sa.Column('registration_date', sa.Date(), nullable=False),
        sa.Column('rental_history', postgresql.ARRAY(sa.String()), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email'),
        sa.UniqueConstraint('driver_license_number')
    )

def downgrade() -> None:
    op.drop_table('customers')
    op.drop_table('cars')
    op.execute('DROP TYPE membership_status')
    op.execute('DROP TYPE car_status')
    op.execute('DROP TYPE car_category')
    op.execute('DROP TYPE fuel_type')
    op.execute('DROP TYPE transmission_type')