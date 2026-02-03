-- RLS Policy for Profiles Table
-- Ensure users can insert their own profile after signing up via Auth

-- 1. Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 2. Allow insert for authenticated users (required for signup flow)
-- This allows a user to insert a row into profiles right after they are created in auth.users
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON profiles;
CREATE POLICY "Allow insert for authenticated users"
ON profiles
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 3. Allow users to read their own profile
DROP POLICY IF EXISTS "Allow users to read their own profile" ON profiles;
CREATE POLICY "Allow users to read their own profile"
ON profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- 4. Allow users to update their own profile
DROP POLICY IF EXISTS "Allow users to update their own profile" ON profiles;
CREATE POLICY "Allow users to update their own profile"
ON profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id);
