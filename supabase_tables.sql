-- Run this in Supabase SQL editor
create extension if not exists "pgcrypto";

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text,
  email text,
  birthday text,
  visits int default 0,
  created_at timestamptz default now()
);

create table if not exists visits_history (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id),
  added_by text,
  method text,
  timestamp timestamptz default now(),
  reward text
);

create table if not exists rewards (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id),
  type text,
  status text default 'active',
  created_at timestamptz default now()
);
