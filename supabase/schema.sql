-- Jalankan di Supabase SQL Editor setelah meninjau kebijakan keamanan.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'admin' check (role in ('admin'))
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  event_type text not null,
  template_code text,
  event_date date,
  event_location text,
  notes text,
  status text not null default 'new' check (status in ('new','confirmed','in_progress','published','cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete set null,
  slug text not null unique,
  title text not null,
  description text,
  event_type text not null,
  template_code text,
  event_date date,
  event_location text,
  content jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.invitations enable row level security;

-- Admin check uses profiles. Create the first profile securely from SQL Editor
-- after creating the auth user; never expose a service-role key in the browser.
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;

drop policy if exists "admin reads profiles" on public.profiles;
create policy "admin reads profiles" on public.profiles for select to authenticated using (public.is_admin());

drop policy if exists "admin manages profiles" on public.profiles;
create policy "admin manages profiles" on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public can submit orders" on public.orders;
create policy "public can submit orders" on public.orders for insert to anon, authenticated with check (
  length(trim(customer_name)) between 2 and 100 and
  length(trim(customer_phone)) between 6 and 30 and
  length(trim(event_type)) between 2 and 30
);

drop policy if exists "admin reads orders" on public.orders;
create policy "admin reads orders" on public.orders for select to authenticated using (public.is_admin());

drop policy if exists "admin updates orders" on public.orders;
create policy "admin updates orders" on public.orders for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public reads published invitations" on public.invitations;
create policy "public reads published invitations" on public.invitations for select to anon, authenticated using (status = 'published');

drop policy if exists "admin manages invitations" on public.invitations;
create policy "admin manages invitations" on public.invitations for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- TODO before production:
-- * Add rate limiting / anti-spam and server-side validation for order creation.
-- * Consider restricting public insert fields via an Edge Function.
-- * Configure private storage bucket and access policies for payment proofs.
-- * Add secure admin-only invitation creation/publishing workflow.
