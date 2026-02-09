-- FIX: Allow Anonymous Profiles by relaxing FK constraints
-- The existing profiles table enforces id -> auth.users(id). 
-- This blocks us from creating profiles for anonymous users (who have no auth record).
-- We need to drop this constraint and ensure id auto-generates for anon users.

-- 1. Drop the Foreign Key constraint (if it exists)
-- Note: Constraint name is usually profiles_id_fkey, but we use IF EXISTS just in case
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- 2. Ensure 'id' has a default generator (so we don't need to supply it for anon users)
-- This allows: INSERT INTO profiles (anon_id, ...) VALUES ('pilot_...', ...) -> id is auto-generated
ALTER TABLE profiles ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- 3. Ensure RLS allows public access (double check from previous attempt)
-- We need PUBLIC to be able to INSERT and UPDATE rows where they have the secret_id or anon_id
DROP POLICY IF EXISTS "Public access to profiles" ON profiles;

CREATE POLICY "Public access to profiles"
ON profiles
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- 4. Grant access to auto-generated columns if needed
GRANT USAGE ON SCHEMA public TO anon;
GRANT ALL ON TABLE profiles TO anon;
GRANT ALL ON TABLE profiles TO authenticated;
GRANT ALL ON TABLE profiles TO service_role;
