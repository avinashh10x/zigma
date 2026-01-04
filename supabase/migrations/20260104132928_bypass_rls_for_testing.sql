-- ============================================
-- Temporarily Bypass RLS for Testing
-- IMPORTANT: Remove this before production!
-- ============================================

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Creators can insert designs" ON designs;
DROP POLICY IF EXISTS "Creators can update own designs" ON designs;

-- Create permissive policies for testing (NO AUTH REQUIRED)

-- Anyone can insert designs (for testing without auth)
CREATE POLICY "Anyone can insert designs (TESTING ONLY)"
  ON designs FOR INSERT
  WITH CHECK (true);

-- Anyone can update designs (for testing without auth)
CREATE POLICY "Anyone can update designs (TESTING ONLY)"
  ON designs FOR UPDATE
  USING (true);

-- Public designs remain readable (this was already working)
-- No change needed to the read policy

-- ============================================
-- NOTE: Before going to production, you MUST:
-- 1. Remove these permissive policies
-- 2. Re-enable the auth-based policies
-- 3. Implement proper authentication
-- ============================================
