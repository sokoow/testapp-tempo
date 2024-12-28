# Database Migrations

This directory contains all the database migrations for the NoFap Tracker application.

## Migration Files

1. `0001_initial_schema.sql`
   - Creates the initial database schema
   - Sets up tables: users, streaks, check_ins, goals
   - Enables Row Level Security (RLS)
   - Creates RLS policies
   - Enables realtime subscriptions
   - Sets up user creation trigger

2. `0002_add_indexes.sql`
   - Adds indexes for better query performance
   - Indexes on frequently queried columns

3. `0003_add_functions.sql`
   - Adds helper functions for streak calculations
   - Functions for checking user status

## How to Apply Migrations

1. Connect to your Supabase project's SQL editor
2. Run each migration file in order
3. Verify the changes in the database schema

## Schema Overview

### Users Table
- Stores user profile information
- Connected to Supabase Auth

### Streaks Table
- Tracks user streaks
- Contains start/end dates and active status

### Check-ins Table
- Daily user check-ins
- Includes mood and journal entries

### Goals Table
- User-defined goals
- Tracks progress towards targets

## Security

All tables have Row Level Security enabled with policies that ensure users can only access their own data.
