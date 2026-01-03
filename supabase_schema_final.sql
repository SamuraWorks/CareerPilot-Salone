-- CAREERPILOT SALONE: FINAL MASTER SCHEMA
-- Comprehensive database schema for all application data
-- Run this in Supabase SQL Editor to synchronize your database

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS (Optional, using text constraints instead for flexibility)

-- 3. USER MANAGEMENT
-- Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    phone_number TEXT,
    avatar_url TEXT,
    location TEXT DEFAULT 'Freetown',
    education_level TEXT,
    career_goal TEXT,
    skills TEXT[],
    interests TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. KNOWLEDGE BASE (STATIC DATA)
-- Careers Database (from career-data.ts)
CREATE TABLE IF NOT EXISTS public.careers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    industry TEXT NOT NULL,
    description TEXT,
    salary_range TEXT,
    demand TEXT CHECK (demand IN ('High', 'Medium', 'Low')),
    required_education TEXT[],
    required_skills TEXT[],
    local_institutions TEXT[],
    growth_potential TEXT,
    keywords TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Ensure title is unique in careers table (fix for 42830 error if table already existed)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'careers_title_key'
    ) THEN
        ALTER TABLE public.careers ADD CONSTRAINT careers_title_key UNIQUE (title);
    END IF;
END $$;

-- Roadmap Templates (from roadmap-database.ts)
CREATE TABLE IF NOT EXISTS public.roadmap_templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    career_title TEXT REFERENCES public.careers(title) ON DELETE CASCADE,
    title TEXT NOT NULL,
    overview TEXT,
    salary_range TEXT,
    demand TEXT,
    phases JSONB NOT NULL, -- Steps, resources, goals
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Universities (from career-data.ts)
CREATE TABLE IF NOT EXISTS public.universities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    location TEXT,
    website_url TEXT,
    logo_url TEXT,
    popular_courses TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Ensure name is unique in universities table
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'universities_name_key'
    ) THEN
        ALTER TABLE public.universities ADD CONSTRAINT universities_name_key UNIQUE (name);
    END IF;
END $$;

-- FAQs (from faq-database.ts)
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT,
    keywords TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 5. OPPORTUNITIES SYSTEM
-- Jobs, Scholarships, Internships, Training (from sierra-leone-opportunities.ts)
CREATE TABLE IF NOT EXISTS public.opportunities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    type TEXT CHECK (type IN ('job', 'scholarship', 'internship', 'training')),
    title TEXT NOT NULL,
    organization TEXT NOT NULL,
    location TEXT,
    description TEXT,
    requirements TEXT[],
    deadline DATE,
    link TEXT,
    salary TEXT, -- For jobs
    duration TEXT, -- For internships/training
    category TEXT[],
    education_level TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 6. USER INTERACTIONS
-- Career Assessment Results
CREATE TABLE IF NOT EXISTS public.career_assessments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    answers JSONB,
    results JSONB, -- AI recommendations
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Saved Roadmaps (Customized by user)
CREATE TABLE IF NOT EXISTS public.user_roadmaps (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    career TEXT NOT NULL,
    overview TEXT,
    phases JSONB NOT NULL,
    progress INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- CVs
CREATE TABLE IF NOT EXISTS public.cvs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT DEFAULT 'My CV',
    content JSONB, -- Structured CV data
    pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Saved Opportunities (Bookmarks/Applications)
CREATE TABLE IF NOT EXISTS public.user_opportunities (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('saved', 'applied', 'interviewing', 'rejected', 'accepted')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    PRIMARY KEY (user_id, opportunity_id)
);

-- 7. MENTORSHIP
CREATE TABLE IF NOT EXISTS public.mentors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    expertise TEXT[],
    bio TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    availability_status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Ensure profile_id exists in mentors (migration fix)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'mentors' AND column_name = 'profile_id'
    ) THEN
        ALTER TABLE public.mentors ADD COLUMN profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE;
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.mentorship_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    mentor_id UUID REFERENCES public.mentors(id) ON DELETE CASCADE,
    mentee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('pending', 'accepted', 'completed', 'cancelled')),
    scheduled_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 8. SYSTEM LOGS
CREATE TABLE IF NOT EXISTS public.ai_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    prompt TEXT,
    response TEXT,
    category TEXT, -- 'career', 'cv', 'general'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 9. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cvs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_logs ENABLE ROW LEVEL SECURITY;

-- POLICIES

-- Public Read Access (Knowledge Base)
DROP POLICY IF EXISTS "Public read careers" ON public.careers;
CREATE POLICY "Public read careers" ON public.careers FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read roadmap templates" ON public.roadmap_templates;
CREATE POLICY "Public read roadmap templates" ON public.roadmap_templates FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read universities" ON public.universities;
CREATE POLICY "Public read universities" ON public.universities FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read faqs" ON public.faqs;
CREATE POLICY "Public read faqs" ON public.faqs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read opportunities" ON public.opportunities;
CREATE POLICY "Public read opportunities" ON public.opportunities FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read mentors" ON public.mentors;
CREATE POLICY "Public read mentors" ON public.mentors FOR SELECT USING (true);

-- Profile Access
DROP POLICY IF EXISTS "Public read profiles" ON public.profiles;
CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users insert own profile" ON public.profiles;
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- User Private Data Access
DROP POLICY IF EXISTS "Users view own assessments" ON public.career_assessments;
CREATE POLICY "Users view own assessments" ON public.career_assessments FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own assessments" ON public.career_assessments;
CREATE POLICY "Users insert own assessments" ON public.career_assessments FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users view own roadmaps" ON public.user_roadmaps;
CREATE POLICY "Users view own roadmaps" ON public.user_roadmaps FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage own roadmaps" ON public.user_roadmaps;
CREATE POLICY "Users manage own roadmaps" ON public.user_roadmaps FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users view own cvs" ON public.cvs;
CREATE POLICY "Users view own cvs" ON public.cvs FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage own cvs" ON public.cvs;
CREATE POLICY "Users manage own cvs" ON public.cvs FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users view own opportunities" ON public.user_opportunities;
CREATE POLICY "Users view own opportunities" ON public.user_opportunities FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage own opportunities" ON public.user_opportunities;
CREATE POLICY "Users manage own opportunities" ON public.user_opportunities FOR ALL USING (auth.uid() = user_id);

-- Mentorship
DROP POLICY IF EXISTS "Users view sessions they are in" ON public.mentorship_sessions;
CREATE POLICY "Users view sessions they are in" ON public.mentorship_sessions 
    FOR SELECT USING (auth.uid() = mentee_id OR auth.uid() IN (SELECT profile_id FROM public.mentors WHERE id = mentor_id));

-- Logging
DROP POLICY IF EXISTS "System insert logs" ON public.ai_logs;
CREATE POLICY "System insert logs" ON public.ai_logs FOR INSERT WITH CHECK (true);