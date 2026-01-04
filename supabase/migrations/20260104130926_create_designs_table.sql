-- ============================================
-- Database Schema for Design Sharing Platform
-- MVP-Safe, Minimal, Correct
-- ============================================

-- 1. Profiles Table
-- Extends Supabase auth.users with app-specific data
-- Keeps auth separate from app data
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  role text check (role in ('creator', 'admin')) default 'creator',
  created_at timestamp with time zone default now()
);

-- 2. Designs Table (CORE TABLE)
-- Stores all design data with encoded payloads
create table designs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  encoded_payload text not null,  -- text, not JSON → safer for opaque data
  payload_version int not null default 1,  -- future-proofs breaking changes
  creator_id uuid not null references profiles(id) on delete cascade,
  is_public boolean default true,
  copy_count int default 0,  -- avoids expensive COUNT queries
  created_at timestamp with time zone default now()
);

-- 3. Design Events Table (Optional Analytics)
-- Clean analytics without overthinking
create table design_events (
  id uuid primary key default gen_random_uuid(),
  design_id uuid references designs(id) on delete cascade,
  event_type text check (event_type in ('copy')),
  created_at timestamp with time zone default now()
);

-- ============================================
-- Indexes for Performance
-- ============================================

-- Index for finding designs by creator
create index idx_designs_creator_id on designs(creator_id);

-- Index for public designs listing
create index idx_designs_public on designs(is_public) where is_public = true;

-- Index for slug lookups (already unique, but explicit index helps)
create index idx_designs_slug on designs(slug);

-- Index for design events analytics
create index idx_design_events_design_id on design_events(design_id);
create index idx_design_events_created_at on design_events(created_at);

-- ============================================
-- Row Level Security (RLS) - NON-NEGOTIABLE
-- Minimal, Safe Policies
-- ============================================

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table designs enable row level security;

-- Profiles: Users can only read and manage their own profile
create policy "Users can read own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

-- Designs: Public Read, Private Write
-- Anyone can read public designs
create policy "Public designs are readable"
  on designs for select
  using (is_public = true);

-- Creator can insert
create policy "Creators can insert designs"
  on designs for insert
  with check (auth.uid() = creator_id);

-- Creator can update own designs
create policy "Creators can update own designs"
  on designs for update
  using (auth.uid() = creator_id);

-- ============================================
-- Functions & Triggers
-- ============================================

-- Function to increment copy_count when a copy event is created
create or replace function increment_design_copy_count()
returns trigger as $$
begin
  update designs
  set copy_count = copy_count + 1
  where id = new.design_id;
  return new;
end;
$$ language plpgsql;

-- Trigger to auto-increment copy_count
create trigger on_design_copy
  after insert on design_events
  for each row
  when (new.event_type = 'copy')
  execute function increment_design_copy_count();

-- Function to create profile on user signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, role)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    'creator'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to auto-create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
