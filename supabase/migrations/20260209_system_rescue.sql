-- System Rescue & Alignment: Core Database Migration
-- Target: CareerPilot Salone Production Stabilization

-- 1. ADMINT PROTECTION: Add is_admin to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- 2. USER PROGRESS & JOURNEY TRACKING (Server-side)
CREATE TABLE IF NOT EXISTS user_journey_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    anon_id TEXT, -- For guest users
    roadmap_id TEXT NOT NULL,
    task_id TEXT NOT NULL,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    -- Ensure task completion is tracked uniquely per user/roadmap
    UNIQUE(user_id, roadmap_id, task_id),
    UNIQUE(anon_id, roadmap_id, task_id)
);

-- Enable RLS for progress
ALTER TABLE user_journey_progress ENABLE ROW LEVEL SECURITY;

-- Allow users to see their own progress
CREATE POLICY "Users can view own progress"
ON user_journey_progress FOR SELECT
TO public
USING (auth.uid() = user_id OR anon_id IS NOT NULL);

-- Allow users to insert their own progress
CREATE POLICY "Users can insert own progress"
ON user_journey_progress FOR INSERT
TO public
WITH CHECK (auth.uid() = user_id OR anon_id IS NOT NULL);

-- 3. SCHOLARSHIP SYSTEM (Verified & Static)
CREATE TABLE IF NOT EXISTS scholarships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    organization TEXT NOT NULL,
    description TEXT,
    education_level JSONB DEFAULT '[]'::jsonb, -- e.g., ["Bachelor", "Master"]
    field TEXT,
    deadline TEXT,
    status TEXT CHECK (status IN ('open', 'closing_soon', 'closed')) DEFAULT 'open',
    official_link TEXT,
    last_verified_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for scholarships
ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;

-- Everyone can view verified scholarships
CREATE POLICY "Anyone can view scholarships"
ON scholarships FOR SELECT
TO public
USING (true);

-- Only admins can manage scholarships
CREATE POLICY "Admins can manage scholarships"
ON scholarships
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.is_admin = true
    )
);

-- 4. TRIGGER: Updated at for scholarships
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_scholarships_updated_at
BEFORE UPDATE ON scholarships
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
