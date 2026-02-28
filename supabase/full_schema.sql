-- CareerPilot Salone: Consolidated Production Database Schema
-- Includes Authentication, Profiles, Scholarships, AI Recommendations, and Progress Tracking

-- ==========================================
-- 1. EXTENSIONS & UTILITIES
-- ==========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Function to automatically update 'updated_at' timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ==========================================
-- 2. CORE TABLES
-- ==========================================

-- PROFILES: Unified table for Auth Users and Guests
-- Note: id fkey to auth.users is relaxed to allow anonymous/guest profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure all columns exist (for existing tables)
DO $$ 
BEGIN 
    -- Basic info
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='full_name') THEN
        ALTER TABLE public.profiles ADD COLUMN full_name TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='phone_number') THEN
        ALTER TABLE public.profiles ADD COLUMN phone_number TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='district') THEN
        ALTER TABLE public.profiles ADD COLUMN district TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='location') THEN
        ALTER TABLE public.profiles ADD COLUMN location TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='education_level') THEN
        ALTER TABLE public.profiles ADD COLUMN education_level TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='highest_education') THEN
        ALTER TABLE public.profiles ADD COLUMN highest_education TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='career_goal') THEN
        ALTER TABLE public.profiles ADD COLUMN career_goal TEXT;
    END IF;

    -- Complex Data (JSONB)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='interests') THEN
        ALTER TABLE public.profiles ADD COLUMN interests JSONB DEFAULT '[]'::jsonb;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='skills') THEN
        ALTER TABLE public.profiles ADD COLUMN skills JSONB DEFAULT '[]'::jsonb;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='career_matches') THEN
        ALTER TABLE public.profiles ADD COLUMN career_matches JSONB DEFAULT '[]'::jsonb;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='resume_data') THEN
        ALTER TABLE public.profiles ADD COLUMN resume_data JSONB DEFAULT '{}'::jsonb;
    END IF;

    -- Status & Flags
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='is_complete') THEN
        ALTER TABLE public.profiles ADD COLUMN is_complete BOOLEAN DEFAULT false;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='profile_completed') THEN
        ALTER TABLE public.profiles ADD COLUMN profile_completed BOOLEAN DEFAULT false;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='is_onboarded') THEN
        ALTER TABLE public.profiles ADD COLUMN is_onboarded BOOLEAN DEFAULT false;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='research_completed') THEN
        ALTER TABLE public.profiles ADD COLUMN research_completed BOOLEAN DEFAULT false;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='is_admin') THEN
        ALTER TABLE public.profiles ADD COLUMN is_admin BOOLEAN DEFAULT false;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='role') THEN
        ALTER TABLE public.profiles ADD COLUMN role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin'));
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='points') THEN
        ALTER TABLE public.profiles ADD COLUMN points INTEGER DEFAULT 0;
    END IF;

    -- Identification
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='secret_id') THEN
        ALTER TABLE public.profiles ADD COLUMN secret_id TEXT UNIQUE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='anon_id') THEN
        ALTER TABLE public.profiles ADD COLUMN anon_id TEXT UNIQUE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='whatsapp_opt_in') THEN
        ALTER TABLE public.profiles ADD COLUMN whatsapp_opt_in BOOLEAN DEFAULT FALSE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='profile_picture_url') THEN
        ALTER TABLE public.profiles ADD COLUMN profile_picture_url TEXT;
    END IF;

END $$;

-- SCHOLARSHIPS: Catalog of verified opportunities
CREATE TABLE IF NOT EXISTS public.scholarships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    organization TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure all scholarship columns exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='scholarships' AND column_name='description') THEN
        ALTER TABLE public.scholarships ADD COLUMN description TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='scholarships' AND column_name='education_level') THEN
        ALTER TABLE public.scholarships ADD COLUMN education_level JSONB DEFAULT '[]'::jsonb;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='scholarships' AND column_name='field') THEN
        ALTER TABLE public.scholarships ADD COLUMN field TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='scholarships' AND column_name='deadline') THEN
        ALTER TABLE public.scholarships ADD COLUMN deadline TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='scholarships' AND column_name='status') THEN
        ALTER TABLE public.scholarships ADD COLUMN status TEXT CHECK (status IN ('open', 'closing_soon', 'closed')) DEFAULT 'open';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='scholarships' AND column_name='official_link') THEN
        ALTER TABLE public.scholarships ADD COLUMN official_link TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='scholarships' AND column_name='last_verified_at') THEN
        ALTER TABLE public.scholarships ADD COLUMN last_verified_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
END $$;

-- USER JOURNEY PROGRESS: Task completion tracking
CREATE TABLE IF NOT EXISTS public.user_journey_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid()
);

DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='user_journey_progress' AND column_name='user_id') THEN
        ALTER TABLE public.user_journey_progress ADD COLUMN user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='user_journey_progress' AND column_name='anon_id') THEN
        ALTER TABLE public.user_journey_progress ADD COLUMN anon_id TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='user_journey_progress' AND column_name='roadmap_id') THEN
        ALTER TABLE public.user_journey_progress ADD COLUMN roadmap_id TEXT NOT NULL;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='user_journey_progress' AND column_name='task_id') THEN
        ALTER TABLE public.user_journey_progress ADD COLUMN task_id TEXT NOT NULL;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='user_journey_progress' AND column_name='completed_at') THEN
        ALTER TABLE public.user_journey_progress ADD COLUMN completed_at TIMESTAMPTZ DEFAULT NOW();
    END IF;

    -- Add unique constraints Safely
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='user_journey_progress_user_id_roadmap_id_task_id_key') THEN
        ALTER TABLE public.user_journey_progress ADD CONSTRAINT user_journey_progress_user_id_roadmap_id_task_id_key UNIQUE(user_id, roadmap_id, task_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='user_journey_progress_anon_id_roadmap_id_task_id_key') THEN
        ALTER TABLE public.user_journey_progress ADD CONSTRAINT user_journey_progress_anon_id_roadmap_id_task_id_key UNIQUE(anon_id, roadmap_id, task_id);
    END IF;
END $$;

-- RECOMMENDATIONS: AI-generated matches
CREATE TABLE IF NOT EXISTS public.recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid()
);

DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='recommendations' AND column_name='user_id') THEN
        ALTER TABLE public.recommendations ADD COLUMN user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='recommendations' AND column_name='anon_id') THEN
        ALTER TABLE public.recommendations ADD COLUMN anon_id TEXT REFERENCES public.profiles(anon_id) ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='recommendations' AND column_name='careers') THEN
        ALTER TABLE public.recommendations ADD COLUMN careers JSONB DEFAULT '[]'::jsonb;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='recommendations' AND column_name='scholarships') THEN
        ALTER TABLE public.recommendations ADD COLUMN scholarships JSONB DEFAULT '[]'::jsonb;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='recommendations' AND column_name='jobs') THEN
        ALTER TABLE public.recommendations ADD COLUMN jobs JSONB DEFAULT '[]'::jsonb;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='recommendations' AND column_name='skills') THEN
        ALTER TABLE public.recommendations ADD COLUMN skills JSONB DEFAULT '[]'::jsonb;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='recommendations' AND column_name='roadmap_summary') THEN
        ALTER TABLE public.recommendations ADD COLUMN roadmap_summary TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='recommendations' AND column_name='generated_at') THEN
        ALTER TABLE public.recommendations ADD COLUMN generated_at TIMESTAMPTZ DEFAULT NOW();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='recommendations' AND column_name='updated_at') THEN
        ALTER TABLE public.recommendations ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
    END IF;

    -- Unique constraints
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='recommendations_user_id_key') THEN
        ALTER TABLE public.recommendations ADD CONSTRAINT recommendations_user_id_key UNIQUE(user_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='recommendations_anon_id_key') THEN
        ALTER TABLE public.recommendations ADD CONSTRAINT recommendations_anon_id_key UNIQUE(anon_id);
    END IF;
END $$;

-- RESEARCH ENTRIES: questionnaire data
CREATE TABLE IF NOT EXISTS public.research_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid()
);

DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='research_entries' AND column_name='profile_id') THEN
        ALTER TABLE public.research_entries ADD COLUMN profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='research_entries' AND column_name='anon_id') THEN
        ALTER TABLE public.research_entries ADD COLUMN anon_id TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='research_entries' AND column_name='sector_interest') THEN
        ALTER TABLE public.research_entries ADD COLUMN sector_interest TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='research_entries' AND column_name='highest_education') THEN
        ALTER TABLE public.research_entries ADD COLUMN highest_education TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='research_entries' AND column_name='skills') THEN
        ALTER TABLE public.research_entries ADD COLUMN skills TEXT[];
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='research_entries' AND column_name='career_goals') THEN
        ALTER TABLE public.research_entries ADD COLUMN career_goals TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='research_entries' AND column_name='opportunities_interest') THEN
        ALTER TABLE public.research_entries ADD COLUMN opportunities_interest TEXT[];
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='research_entries' AND column_name='wants_recommendations') THEN
        ALTER TABLE public.research_entries ADD COLUMN wants_recommendations BOOLEAN DEFAULT true;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='research_entries' AND column_name='feedback') THEN
        ALTER TABLE public.research_entries ADD COLUMN feedback TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='research_entries' AND column_name='created_at') THEN
        ALTER TABLE public.research_entries ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='research_entries' AND column_name='updated_at') THEN
        ALTER TABLE public.research_entries ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
END $$;

-- FEEDBACK: Bug reports and features
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid()
);

DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='feedback' AND column_name='profile_id') THEN
        ALTER TABLE public.feedback ADD COLUMN profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='feedback' AND column_name='message') THEN
        ALTER TABLE public.feedback ADD COLUMN message TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='feedback' AND column_name='email') THEN
        ALTER TABLE public.feedback ADD COLUMN email TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='feedback' AND column_name='type') THEN
        ALTER TABLE public.feedback ADD COLUMN type TEXT DEFAULT 'general';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='feedback' AND column_name='status') THEN
        ALTER TABLE public.feedback ADD COLUMN status TEXT DEFAULT 'new';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='feedback' AND column_name='created_at') THEN
        ALTER TABLE public.feedback ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
END $$;

-- WHATSAPP SESSIONS: Bot state management
CREATE TABLE IF NOT EXISTS public.whatsapp_sessions (
    phone_number TEXT PRIMARY KEY,
    state JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- LEGACY TRACKING (Sync with old components)
CREATE TABLE IF NOT EXISTS public.progress_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid()
);

DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='progress_tracking' AND column_name='user_id') THEN
        ALTER TABLE public.progress_tracking ADD COLUMN user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='progress_tracking' AND column_name='current_stage') THEN
        ALTER TABLE public.progress_tracking ADD COLUMN current_stage TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='progress_tracking' AND column_name='completed_steps') THEN
        ALTER TABLE public.progress_tracking ADD COLUMN completed_steps JSONB DEFAULT '[]'::jsonb;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='progress_tracking' AND column_name='updated_at') THEN
        ALTER TABLE public.progress_tracking ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
    END IF;

    -- Unique constraint
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='progress_tracking_user_id_key') THEN
        ALTER TABLE public.progress_tracking ADD CONSTRAINT progress_tracking_user_id_key UNIQUE(user_id);
    END IF;
END $$;

-- ==========================================
-- 3. SECURITY & RLS POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_journey_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_tracking ENABLE ROW LEVEL SECURITY;

-- 3.1 PROFILES POLICIES
DROP POLICY IF EXISTS "Public access to profiles" ON public.profiles;
CREATE POLICY "Public access to profiles" ON public.profiles FOR ALL TO public USING (true) WITH CHECK (true);

-- 3.2 SCHOLARSHIPS POLICIES
DROP POLICY IF EXISTS "Anyone can view scholarships" ON public.scholarships;
CREATE POLICY "Anyone can view scholarships" ON public.scholarships FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Admins can manage scholarships" ON public.scholarships;
CREATE POLICY "Admins can manage scholarships" ON public.scholarships FOR ALL TO authenticated 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND (role = 'admin' OR is_admin = true)));

-- 3.3 USER JOURNEY PROGRESS POLICIES
DROP POLICY IF EXISTS "Users can manage own progress" ON public.user_journey_progress;
CREATE POLICY "Users can manage own progress" ON public.user_journey_progress FOR ALL TO public 
USING (auth.uid() = user_id OR anon_id IS NOT NULL)
WITH CHECK (auth.uid() = user_id OR anon_id IS NOT NULL);

-- 3.4 RECOMMENDATIONS POLICIES
DROP POLICY IF EXISTS "Public access to recommendations" ON public.recommendations;
CREATE POLICY "Public access to recommendations" ON public.recommendations FOR ALL TO public USING (true) WITH CHECK (true);

-- 3.5 RESEARCH ENTRIES POLICIES
DROP POLICY IF EXISTS "Enable insert for all" ON public.research_entries;
CREATE POLICY "Enable insert for all" ON public.research_entries FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Owners can view research" ON public.research_entries;
CREATE POLICY "Owners can view research" ON public.research_entries FOR SELECT USING (auth.uid() = profile_id OR anon_id IS NOT NULL);

-- 3.6 FEEDBACK POLICIES
DROP POLICY IF EXISTS "Enable insert for everyone" ON public.feedback;
CREATE POLICY "Enable insert for everyone" ON public.feedback FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view feedback" ON public.feedback;
CREATE POLICY "Admins can view feedback" ON public.feedback FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND (role = 'admin' OR is_admin = true)));

-- 3.7 WHATSAPP SESSIONS POLICIES
DROP POLICY IF EXISTS "Service role access for whatsapp_sessions" ON public.whatsapp_sessions;
CREATE POLICY "Service role access for whatsapp_sessions" ON public.whatsapp_sessions FOR ALL TO authenticated USING (true);

-- ==========================================
-- 4. AUTHENTICATION TRIGGERS
-- ==========================================

-- Automatically create a profile when a new user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- 5. AUTO-TIMESTAMP TRIGGERS
-- ==========================================
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_scholarships_updated_at ON scholarships;
CREATE TRIGGER update_scholarships_updated_at BEFORE UPDATE ON scholarships FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_recommendations_updated_at ON recommendations;
CREATE TRIGGER update_recommendations_updated_at BEFORE UPDATE ON recommendations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_research_entries_updated_at ON research_entries;
CREATE TRIGGER update_research_entries_updated_at BEFORE UPDATE ON research_entries FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_progress_tracking_updated_at ON progress_tracking;
CREATE TRIGGER update_progress_tracking_updated_at BEFORE UPDATE ON progress_tracking FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ==========================================
-- 6. INDEXES
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_profiles_secret_id ON profiles(secret_id);
CREATE INDEX IF NOT EXISTS idx_profiles_anon_id ON profiles(anon_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_anon_id ON recommendations(anon_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_user_id ON recommendations(user_id);

-- ==========================================
-- 7. PERMISSIONS
-- ==========================================
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
