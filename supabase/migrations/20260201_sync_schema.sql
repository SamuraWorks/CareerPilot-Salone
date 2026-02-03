-- CareerPilot Salone: Supabase Synchronization Migration
-- This script adds missing columns to the profiles table and creates the whatsapp_sessions table.

-- 1. Ensure Profiles Table has all required columns
DO $$ 
BEGIN 
    -- Basic info
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='secret_id') THEN
        ALTER TABLE profiles ADD COLUMN secret_id TEXT UNIQUE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='phone_number') THEN
        ALTER TABLE profiles ADD COLUMN phone_number TEXT;
    END IF;

    -- System Flags & Gamification
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='whatsapp_opt_in') THEN
        ALTER TABLE profiles ADD COLUMN whatsapp_opt_in BOOLEAN DEFAULT FALSE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='is_complete') THEN
        ALTER TABLE profiles ADD COLUMN is_complete BOOLEAN DEFAULT FALSE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='points') THEN
        ALTER TABLE profiles ADD COLUMN points INTEGER DEFAULT 0;
    END IF;

    -- Profile Details
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='location') THEN
        ALTER TABLE profiles ADD COLUMN location TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='education_level') THEN
        ALTER TABLE profiles ADD COLUMN education_level TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='career_goal') THEN
        ALTER TABLE profiles ADD COLUMN career_goal TEXT;
    END IF;

    -- Complex Data (JSONB)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='skills') THEN
        ALTER TABLE profiles ADD COLUMN skills JSONB DEFAULT '[]'::jsonb;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='interests') THEN
        ALTER TABLE profiles ADD COLUMN interests JSONB DEFAULT '[]'::jsonb;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='career_matches') THEN
        ALTER TABLE profiles ADD COLUMN career_matches JSONB DEFAULT '[]'::jsonb;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='resume_data') THEN
        ALTER TABLE profiles ADD COLUMN resume_data JSONB DEFAULT '{}'::jsonb;
    END IF;

    -- Legacy support (optional)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='is_onboarded') THEN
        ALTER TABLE profiles ADD COLUMN is_onboarded BOOLEAN DEFAULT FALSE;
    END IF;

END $$;

-- 2. Create WhatsApp Sessions Table
CREATE TABLE IF NOT EXISTS whatsapp_sessions (
    phone_number TEXT PRIMARY KEY,
    state JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable RLS on WhatsApp Sessions
ALTER TABLE whatsapp_sessions ENABLE ROW LEVEL SECURITY;

-- 4. RLS for WhatsApp Sessions (Authenticated access for bot)
DROP POLICY IF EXISTS "Service role access for whatsapp_sessions" ON whatsapp_sessions;
CREATE POLICY "Service role access for whatsapp_sessions"
ON whatsapp_sessions
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Index for secret_id lookups during login
CREATE INDEX IF NOT EXISTS idx_profiles_secret_id ON profiles(secret_id);
