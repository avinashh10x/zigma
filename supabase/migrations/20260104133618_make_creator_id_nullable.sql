-- ============================================
-- Make creator_id Nullable for Testing
-- Allows designs without authentication
-- ============================================

-- Drop the existing foreign key constraint
ALTER TABLE designs 
DROP CONSTRAINT IF EXISTS designs_creator_id_fkey;

-- Make creator_id nullable
ALTER TABLE designs 
ALTER COLUMN creator_id DROP NOT NULL;

-- Re-add the foreign key constraint but allow NULL values
ALTER TABLE designs
ADD CONSTRAINT designs_creator_id_fkey 
FOREIGN KEY (creator_id) 
REFERENCES profiles(id) 
ON DELETE SET NULL;

-- Note: This allows creating designs without a creator
-- In production, you should enforce creator_id with proper auth
