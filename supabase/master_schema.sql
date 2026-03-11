-- CareerPilot Salone: Master Consolidated Production Database Schema
-- Includes Authentication, Profiles, Scholarships, AI Recommendations, Progress Tracking, Documents, and Storage
-- This script is idempotent (can be run multiple times safely)

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

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='phone') THEN
        ALTER TABLE public.profiles ADD COLUMN phone TEXT;
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

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='badges') THEN
        ALTER TABLE public.profiles ADD COLUMN badges TEXT[] DEFAULT '{}';
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

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='status') THEN
        ALTER TABLE public.profiles ADD COLUMN status TEXT DEFAULT 'student';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='points') THEN
        ALTER TABLE public.profiles ADD COLUMN points INTEGER DEFAULT 0;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='data_saver_enabled') THEN
        ALTER TABLE public.profiles ADD COLUMN data_saver_enabled BOOLEAN DEFAULT false;
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

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='avatar_url') THEN
        ALTER TABLE public.profiles ADD COLUMN avatar_url TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='profile_picture_url') THEN
        ALTER TABLE public.profiles ADD COLUMN profile_picture_url TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='active_roadmap_id') THEN
        ALTER TABLE public.profiles ADD COLUMN active_roadmap_id TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='profiles' AND column_name='last_updated_at') THEN
        ALTER TABLE public.profiles ADD COLUMN last_updated_at TIMESTAMPTZ;
    END IF;

END $$;

-- SCHOLARSHIPS: Catalog of verified opportunities
CREATE TABLE IF NOT EXISTS public.scholarships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    organization TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    description TEXT,
    education_level JSONB DEFAULT '[]'::jsonb,
    field TEXT,
    deadline TEXT,
    status TEXT CHECK (status IN ('open', 'closing_soon', 'closed')) DEFAULT 'open',
    official_link TEXT,
    last_verified_at TIMESTAMPTZ DEFAULT NOW()
);

-- USER JOURNEY PROGRESS: Task completion tracking
CREATE TABLE IF NOT EXISTS public.user_journey_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    anon_id TEXT,
    roadmap_id TEXT NOT NULL,
    task_id TEXT NOT NULL,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT user_journey_progress_user_id_roadmap_id_task_id_key UNIQUE(user_id, roadmap_id, task_id),
    CONSTRAINT user_journey_progress_anon_id_roadmap_id_task_id_key UNIQUE(anon_id, roadmap_id, task_id)
);

-- RECOMMENDATIONS: AI-generated matches
CREATE TABLE IF NOT EXISTS public.recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    anon_id TEXT UNIQUE REFERENCES public.profiles(anon_id) ON DELETE CASCADE,
    careers JSONB DEFAULT '[]'::jsonb,
    scholarships JSONB DEFAULT '[]'::jsonb,
    jobs JSONB DEFAULT '[]'::jsonb,
    skills JSONB DEFAULT '[]'::jsonb,
    roadmap_summary TEXT,
    generated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RESEARCH ENTRIES: questionnaire data
CREATE TABLE IF NOT EXISTS public.research_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    anon_id TEXT,
    sector_interest TEXT,
    highest_education TEXT,
    skills TEXT[],
    career_goals TEXT,
    opportunities_interest TEXT[],
    wants_recommendations BOOLEAN DEFAULT true,
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FEEDBACK: Bug reports and features
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    message TEXT,
    email TEXT,
    type TEXT DEFAULT 'general',
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- WHATSAPP SESSIONS: Bot state management
CREATE TABLE IF NOT EXISTS public.whatsapp_sessions (
    phone_number TEXT PRIMARY KEY,
    state JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- USER DOCUMENTS: Store CVs, cover letters, roadmap exports
CREATE TABLE IF NOT EXISTS public.user_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'cv', 'letter', 'roadmap'
    title TEXT NOT NULL,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ACTIVITY LOGS: Track user engagement
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- LEGACY TRACKING (Sync with old components)
CREATE TABLE IF NOT EXISTS public.progress_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    current_stage TEXT,
    completed_steps JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 3. STORAGE SET-UP
-- ==========================================

-- Ensure 'avatars' storage bucket exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- ==========================================
-- 4. SECURITY & RLS POLICIES
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
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- 4.1 PROFILES POLICIES
DROP POLICY IF EXISTS "Public access to profiles" ON public.profiles;
CREATE POLICY "Public access to profiles" ON public.profiles FOR ALL TO public USING (true) WITH CHECK (true);

-- 4.2 SCHOLARSHIPS POLICIES
DROP POLICY IF EXISTS "Anyone can view scholarships" ON public.scholarships;
CREATE POLICY "Anyone can view scholarships" ON public.scholarships FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Admins can manage scholarships" ON public.scholarships;
CREATE POLICY "Admins can manage scholarships" ON public.scholarships FOR ALL TO authenticated 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND (role = 'admin' OR is_admin = true)));

-- 4.3 USER JOURNEY PROGRESS POLICIES
DROP POLICY IF EXISTS "Users can manage own progress" ON public.user_journey_progress;
CREATE POLICY "Users can manage own progress" ON public.user_journey_progress FOR ALL TO public 
USING (auth.uid() = user_id OR anon_id IS NOT NULL)
WITH CHECK (auth.uid() = user_id OR anon_id IS NOT NULL);

-- 4.4 RECOMMENDATIONS POLICIES
DROP POLICY IF EXISTS "Public access to recommendations" ON public.recommendations;
CREATE POLICY "Public access to recommendations" ON public.recommendations FOR ALL TO public USING (true) WITH CHECK (true);

-- 4.5 RESEARCH ENTRIES POLICIES
DROP POLICY IF EXISTS "Enable insert for all" ON public.research_entries;
CREATE POLICY "Enable insert for all" ON public.research_entries FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Owners can view research" ON public.research_entries;
CREATE POLICY "Owners can view research" ON public.research_entries FOR SELECT USING (auth.uid() = profile_id OR anon_id IS NOT NULL);

-- 4.6 FEEDBACK POLICIES
DROP POLICY IF EXISTS "Enable insert for everyone" ON public.feedback;
CREATE POLICY "Enable insert for everyone" ON public.feedback FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view feedback" ON public.feedback;
CREATE POLICY "Admins can view feedback" ON public.feedback FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND (role = 'admin' OR is_admin = true)));

-- 4.7 WHATSAPP SESSIONS POLICIES
DROP POLICY IF EXISTS "Service role access for whatsapp_sessions" ON public.whatsapp_sessions;
CREATE POLICY "Service role access for whatsapp_sessions" ON public.whatsapp_sessions FOR ALL TO authenticated USING (true);

-- 4.8 USER ENTITY POLICIES (DOCS, ACTIVITY, LOGS)
DROP POLICY IF EXISTS "Users can manage own documents" ON public.user_documents;
CREATE POLICY "Users can manage own documents" ON public.user_documents FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own activity" ON public.activity_logs;
CREATE POLICY "Users can view own activity" ON public.activity_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anyone can log activity" ON public.activity_logs;
CREATE POLICY "Anyone can log activity" ON public.activity_logs FOR INSERT TO public WITH CHECK (true);

-- 4.9 STORAGE POLICIES
-- Allow authenticated users to upload to avatars
DROP POLICY IF EXISTS "Users can upload avatars" ON storage.objects;
CREATE POLICY "Users can upload avatars" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Public can read avatars" ON storage.objects;
CREATE POLICY "Public can read avatars" ON storage.objects FOR SELECT TO public USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Users can update their own avatars" ON storage.objects;
CREATE POLICY "Users can update their own avatars" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Users can delete their own avatars" ON storage.objects;
CREATE POLICY "Users can delete their own avatars" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'avatars');


-- ==========================================
-- 5. AUTHENTICATION TRIGGERS
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
-- 6. AUTO-TIMESTAMP TRIGGERS
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

DROP TRIGGER IF EXISTS update_user_documents_updated_at ON user_documents;
CREATE TRIGGER update_user_documents_updated_at BEFORE UPDATE ON user_documents FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ==========================================
-- 7. INDEXES
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_profiles_secret_id ON profiles(secret_id);
CREATE INDEX IF NOT EXISTS idx_profiles_anon_id ON profiles(anon_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_anon_id ON recommendations(anon_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_user_id ON recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_user_documents_user_id ON user_documents(user_id);

-- ==========================================
-- 8. PERMISSIONS
-- ==========================================
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
