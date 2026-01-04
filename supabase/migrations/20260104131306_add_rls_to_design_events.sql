-- ============================================
-- Add RLS to design_events Table
-- Secure analytics tracking
-- ============================================

-- Enable RLS on design_events
alter table design_events enable row level security;

-- Policy: Anyone can insert copy events (for public tracking)
-- This allows the copy button to work without auth
create policy "Anyone can log copy events"
  on design_events for insert
  with check (event_type = 'copy');

-- Policy: Only admins can read events (analytics are private)
-- Prevents users from seeing analytics data
create policy "Only admins can read events"
  on design_events for select
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Policy: No one can update or delete events (immutable analytics)
-- Events should never be modified once created
-- (No policies needed - default deny)
