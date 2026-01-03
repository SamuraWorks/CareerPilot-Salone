-- CAREERPILOT SALONE: MASTER DATABASE SCHEMA
-- Full synchronization script. Run in Supabase SQL Editor.

-- 1. Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Tables (Idempotent)
DO $$ 
BEGIN
    -- JOBS TABLE
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'jobs') THEN
        CREATE TABLE public.jobs (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            title TEXT NOT NULL,
            organization TEXT NOT NULL,
            description TEXT,
            location TEXT DEFAULT 'Sierra Leone',
            type TEXT DEFAULT 'job',
            category TEXT[] DEFAULT '{}',
            education_level TEXT[] DEFAULT '{}',
            salary TEXT,
            deadline TEXT,
            link TEXT,
            created_at TIMESTAMPTZ DEFAULT now()
        );
    END IF;

    -- SCHOLARSHIPS TABLE
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'scholarships') THEN
        CREATE TABLE public.scholarships (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            title TEXT NOT NULL,
            organization TEXT NOT NULL,
            description TEXT,
            category TEXT[] DEFAULT '{}',
            requirements TEXT[] DEFAULT '{}',
            education_level TEXT[] DEFAULT '{}',
            deadline TEXT,
            link TEXT,
            created_at TIMESTAMPTZ DEFAULT now()
        );
    END IF;

    -- UNIVERSITIES TABLE
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'universities') THEN
        CREATE TABLE public.universities (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            website_url TEXT,
            logo_url TEXT,
            popular_courses TEXT[] DEFAULT '{}',
            created_at TIMESTAMPTZ DEFAULT now()
        );
    END IF;

    -- USER PROFILES
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles') THEN
        CREATE TABLE public.user_profiles (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES auth.users ON DELETE CASCADE,
            name TEXT,
            education_level TEXT,
            career_goal TEXT,
            subjects TEXT[],
            interests TEXT[],
            whatsapp_number TEXT,
            whatsapp_subscribed BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ DEFAULT now()
        );
    END IF;

    -- AI_LOGS TABLE
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'ai_logs') THEN
        CREATE TABLE public.ai_logs (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES auth.users ON DELETE SET NULL,
            prompt TEXT,
            response TEXT,
            provider TEXT DEFAULT 'gemini',
            status TEXT DEFAULT 'success',
            created_at TIMESTAMPTZ DEFAULT now()
        );
    END IF;

    -- CAREER TEST RESULTS
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'career_test_results') THEN
        CREATE TABLE public.career_test_results (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES auth.users ON DELETE CASCADE,
            riasec_score JSONB,
            top_type TEXT,
            recommendations JSONB,
            summary TEXT,
            created_at TIMESTAMPTZ DEFAULT now()
        );
    END IF;

    -- ROADMAPS TABLE
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'roadmaps') THEN
        CREATE TABLE public.roadmaps (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES auth.users ON DELETE CASCADE,
            career TEXT NOT NULL,
            title TEXT NOT NULL,
            overview TEXT,
            phases JSONB NOT NULL,
            created_at TIMESTAMPTZ DEFAULT now()
        );
    END IF;

END $$;

-- 3. Enable Row Level Security
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
DO $$ 
BEGIN
    -- Public Read Access
    DROP POLICY IF EXISTS "Public can view jobs" ON public.jobs;
    CREATE POLICY "Public can view jobs" ON public.jobs FOR SELECT USING (true);
    
    DROP POLICY IF EXISTS "Public can view scholarships" ON public.scholarships;
    CREATE POLICY "Public can view scholarships" ON public.scholarships FOR SELECT USING (true);
    
    DROP POLICY IF EXISTS "Public can view universities" ON public.universities;
    CREATE POLICY "Public can view universities" ON public.universities FOR SELECT USING (true);

    -- User Private Access: Profiles
    DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
    CREATE POLICY "Users can view own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = user_id);
    
    DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
    CREATE POLICY "Users can update own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = user_id);

    DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
    CREATE POLICY "Users can insert own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

    -- User Private Access: Career Test Results
    DROP POLICY IF EXISTS "Users can view own test results" ON public.career_test_results;
    CREATE POLICY "Users can view own test results" ON public.career_test_results FOR SELECT USING (auth.uid() = user_id);

    DROP POLICY IF EXISTS "Users can insert own test results" ON public.career_test_results;
    CREATE POLICY "Users can insert own test results" ON public.career_test_results FOR INSERT WITH CHECK (auth.uid() = user_id);

    -- User Private Access: Roadmaps
    DROP POLICY IF EXISTS "Users can view own roadmaps" ON public.roadmaps;
    CREATE POLICY "Users can view own roadmaps" ON public.roadmaps FOR SELECT USING (auth.uid() = user_id);
    
    DROP POLICY IF EXISTS "Users can insert own roadmaps" ON public.roadmaps;
    CREATE POLICY "Users can insert own roadmaps" ON public.roadmaps FOR INSERT WITH CHECK (auth.uid() = user_id);
    
    DROP POLICY IF EXISTS "Users can delete own roadmaps" ON public.roadmaps;
    CREATE POLICY "Users can delete own roadmaps" ON public.roadmaps FOR DELETE USING (auth.uid() = user_id);

    -- AI Logs (Admin Only Read, Any User Insert)
    DROP POLICY IF EXISTS "Users can insert ai_logs" ON public.ai_logs;
    CREATE POLICY "Users can insert ai_logs" ON public.ai_logs FOR INSERT WITH CHECK (true);
END $$;
