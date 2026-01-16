-- ==========================================
-- CAREERPILOT SALONE - COMPREHENSIVE SCHEMA (ROBUST VERSION)
-- Copy and paste this into the Supabase SQL Editor
-- ==========================================

-- 1. PROFILES TABLE (Core User Data)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  age INTEGER,
  location TEXT,
  whatsapp_number TEXT,
  education_level TEXT,
  skills TEXT[],
  interests TEXT[],
  career_goal TEXT,
  active_roadmap_id UUID,
  points INTEGER DEFAULT 0,
  is_onboarded BOOLEAN DEFAULT FALSE,
  whatsapp_subscribed BOOLEAN DEFAULT FALSE,
  preferred_language TEXT DEFAULT 'English',
  impact_metrics TEXT,
  leadership_experience TEXT,
  unique_hook TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. ROADMAPS TABLE
CREATE TABLE IF NOT EXISTS public.roadmaps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  overview TEXT,
  content JSONB NOT NULL,
  progress INTEGER DEFAULT 0,
  completed_tasks TEXT[],
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. OPPORTUNITIES TABLE
CREATE TABLE IF NOT EXISTS public.opportunities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  type TEXT CHECK (type IN ('jobs', 'scholarships', 'internships', 'training')),
  location TEXT DEFAULT 'Sierra Leone',
  deadline TEXT,
  description TEXT,
  apply_url TEXT,
  is_verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. MENTORS TABLE
CREATE TABLE IF NOT EXISTS public.mentors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  expertise TEXT[],
  bio TEXT,
  contact_info TEXT,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. CHAT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  role TEXT CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==========================================
-- ENABLE RLS
-- ==========================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- CLEAN & CREATE POLICIES (DROP IF EXISTS FIRST)
-- ==========================================

-- Profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Roadmaps
DROP POLICY IF EXISTS "Users can view own roadmaps" ON public.roadmaps;
CREATE POLICY "Users can view own roadmaps" ON public.roadmaps FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can edit own roadmaps" ON public.roadmaps;
CREATE POLICY "Users can edit own roadmaps" ON public.roadmaps FOR ALL USING (auth.uid() = user_id);

-- Chat
DROP POLICY IF EXISTS "Users can view own messages" ON public.chat_messages;
CREATE POLICY "Users can view own messages" ON public.chat_messages FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can send messages" ON public.chat_messages;
CREATE POLICY "Users can send messages" ON public.chat_messages FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Shared Resources
DROP POLICY IF EXISTS "Anyone can view opportunities" ON public.opportunities;
CREATE POLICY "Anyone can view opportunities" ON public.opportunities FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can view mentors" ON public.mentors;
CREATE POLICY "Anyone can view mentors" ON public.mentors FOR SELECT USING (true);

-- 6. WHATSAPP SESSIONS (Persistent Bot State)
CREATE TABLE IF NOT EXISTS public.whatsapp_sessions (
  phone_number TEXT PRIMARY KEY,
  state JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.whatsapp_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role can manage all sessions" ON public.whatsapp_sessions FOR ALL USING (true);

-- ==========================================
-- HELPERS
-- ==========================================
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_profile_modtime ON public.profiles;
CREATE TRIGGER update_profile_modtime
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE PROCEDURE update_modified_column();
