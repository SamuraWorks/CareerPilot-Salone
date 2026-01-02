-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extends Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone_number TEXT,
  avatar_url TEXT,
  location TEXT DEFAULT 'Freetown, Sierra Leone',
  education_level TEXT,
  skills TEXT[], -- Array of strings
  interests TEXT[],
  career_goal TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CAREER ASSESSMENTS
CREATE TABLE IF NOT EXISTS public.assessments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  type TEXT CHECK (type IN ('personality', 'skills', 'general')),
  answers JSONB, -- Storing raw question/answer pairs
  results JSONB, -- AI Analysis result: { "recommended_careers": [...] }
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. OPPORTUNITIES (Jobs, Scholarships, Internships)
CREATE TABLE IF NOT EXISTS public.opportunities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  type TEXT CHECK (type IN ('JOB', 'INTERNSHIP', 'SCHOLARSHIP', 'TRAINING')),
  description TEXT,
  location TEXT,
  salary_range TEXT,
  deadline DATE,
  application_link TEXT,
  tags TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. SAVED OPPORTUNITIES (Bookmarks)
CREATE TABLE IF NOT EXISTS public.saved_opportunities (
  user_id UUID REFERENCES public.profiles(id),
  opportunity_id UUID REFERENCES public.opportunities(id),
  status TEXT CHECK (status IN ('SAVED', 'APPLIED', 'INTERESTED')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  PRIMARY KEY (user_id, opportunity_id)
);

-- 5. CVS (Resumes)
CREATE TABLE IF NOT EXISTS public.cvs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  title TEXT DEFAULT 'My CV',
  content JSONB, -- Structured CV data
  pfd_url TEXT, -- Link to storage if saved
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 6. MENTORSHIP
CREATE TABLE IF NOT EXISTS public.mentors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id),
  expertise TEXT[],
  bio TEXT,
  availability_status BOOLEAN DEFAULT TRUE,
  verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS public.mentorship_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  mentor_id UUID REFERENCES public.mentors(id),
  mentee_id UUID REFERENCES public.profiles(id),
  status TEXT CHECK (status IN ('PENDING', 'ACCEPTED', 'COMPLETED', 'CANCELLED')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 7. CHAT LOGS (For AI Improvement)
CREATE TABLE IF NOT EXISTS public.chat_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  messages JSONB, -- Array of message objects
  category TEXT, -- "CAREER", "CV_HELP", etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- RLS POLICIES (Example: Profiles)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Safely recreate policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING ( true );

DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;
CREATE POLICY "Users can update own profile."
  ON public.profiles FOR UPDATE
  USING ( auth.uid() = id );
