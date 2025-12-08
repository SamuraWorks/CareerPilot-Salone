-- 1. USERS PROFILE TABLE
-- Links to Supabase Auth
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  full_name text,
  phone_number text,
  location text, -- e.g., 'Freetown', 'Bo'
  education_level text, -- e.g., 'WASSCE', 'Degree', 'Master'
  interests text[], -- Array of interests
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile" 
  on public.profiles for select 
  using (auth.uid() = id);

create policy "Users can update their own profile" 
  on public.profiles for update 
  using (auth.uid() = id);

-- 2. SAVED CAREERS (Bookmarks)
create table if not exists public.saved_careers (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  career_id uuid references public.careers(id) on delete cascade not null,
  notes text,
  created_at timestamptz default now(),
  unique(user_id, career_id)
);

alter table public.saved_careers enable row level security;

create policy "Users can manage their saved careers" 
  on public.saved_careers for all 
  using (auth.uid() = user_id);

-- 3. CVS TABLE
create table if not exists public.cvs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null default 'My CV',
  content jsonb not null, -- Stores the full CV data structure
  is_public boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.cvs enable row level security;

create policy "Users can manage their CVs" 
  on public.cvs for all 
  using (auth.uid() = user_id);

-- 4. TRIGGER FOR NEW USERS
-- Automatically create profile when a user signs up
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists to avoid duplication errors on multiple runs
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
