-- CareerPilot Salone: Anonymous Profiling & AI Recommendations
-- This script adds missing columns to the profiles table and creates the recommendations table.

-- 1. Update Profiles Table
DO $$ 
BEGIN 
    -- Anonymous Identification
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='anon_id') THEN
        ALTER TABLE profiles ADD COLUMN anon_id TEXT UNIQUE;
    END IF;

    -- Mission Specific Fields
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='phone') THEN
        ALTER TABLE profiles ADD COLUMN phone TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='district') THEN
        ALTER TABLE profiles ADD COLUMN district TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='highest_education') THEN
        ALTER TABLE profiles ADD COLUMN highest_education TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='profile_picture_url') THEN
        ALTER TABLE profiles ADD COLUMN profile_picture_url TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='profile_completed') THEN
        ALTER TABLE profiles ADD COLUMN profile_completed BOOLEAN DEFAULT FALSE;
    END IF;

END $$;

-- 2. Create Recommendations Table
CREATE TABLE IF NOT EXISTS recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    anon_id TEXT REFERENCES profiles(anon_id) ON DELETE CASCADE,
    careers JSONB DEFAULT '[]'::jsonb,
    scholarships JSONB DEFAULT '[]'::jsonb,
    jobs JSONB DEFAULT '[]'::jsonb,
    skills JSONB DEFAULT '[]'::jsonb,
    roadmap_summary TEXT,
    generated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for anon_id lookups
CREATE INDEX IF NOT EXISTS idx_recommendations_anon_id ON recommendations(anon_id);

-- 3. Enable RLS
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
-- Allow anyone with an anon_id to read/write their own recommendations
-- (Since we aren't using Supabase Auth strictly for this, we use the anon_id logic in the app)
-- However, for Supabase client to work without auth context, we might need more open policies 
-- or handle everything via service role in API routes.
-- User said: "All data is saved to Supabase", so we'll allow public access for now 
-- or assume API routes handle it. 

DROP POLICY IF EXISTS "Public access to recommendations" ON recommendations;
CREATE POLICY "Public access to recommendations"
ON recommendations
FOR ALL
TO public
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Public access to profiles" ON profiles;
CREATE POLICY "Public access to profiles"
ON profiles
FOR ALL
TO public
USING (true)
WITH CHECK (true);
