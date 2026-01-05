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
  roadmap_progress INTEGER DEFAULT 0, -- Added to track progress
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. UNIVERSITIES (New)
CREATE TABLE IF NOT EXISTS public.universities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  website_url TEXT,
  logo_url TEXT,
  popular_courses TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2.5. CAREERS (New - Dynamic Career Data)
CREATE TABLE IF NOT EXISTS public.careers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  industry TEXT,
  description TEXT,
  salary_range TEXT,
  salary_usd TEXT,
  demand TEXT CHECK (demand IN ('High', 'Medium', 'Low')),
  required_education TEXT[],
  required_skills TEXT[],
  local_institutions TEXT[],
  growth_potential TEXT,
  keywords TEXT[],
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. MENTORS (Updated to match frontend rich data)
CREATE TABLE IF NOT EXISTS public.mentors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  -- profile_id can be null if the mentor isn't a registered system user yet
  profile_id UUID REFERENCES public.profiles(id), 
  name TEXT NOT NULL,
  role TEXT,
  field TEXT,
  experience TEXT,
  location TEXT,
  education TEXT,
  bio TEXT,
  image_url TEXT,
  support_types TEXT[], -- e.g. ['Career Strategy', 'Innovation']
  availability TEXT CHECK (availability IN ('Free', 'Sponsored', 'Paid')),
  credibility TEXT,
  insights TEXT[], -- Array of strings for quotes/insights
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 4. OPPORTUNITIES (Jobs, Scholarships, Internships, Training)
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

-- 5. CAREER ASSESSMENTS
CREATE TABLE IF NOT EXISTS public.assessments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  type TEXT CHECK (type IN ('personality', 'skills', 'general')),
  answers JSONB, -- Storing raw question/answer pairs
  results JSONB, -- AI Analysis result: { "recommended_careers": [...] }
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. ROADMAPS (AI Generated Career Plans)
CREATE TABLE IF NOT EXISTS public.roadmaps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  career TEXT NOT NULL,
  overview TEXT,
  content JSONB, -- Stores the full complex AI response
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. SAVED OPPORTUNITIES (Bookmarks)
CREATE TABLE IF NOT EXISTS public.saved_opportunities (
  user_id UUID REFERENCES public.profiles(id),
  opportunity_id UUID REFERENCES public.opportunities(id),
  status TEXT CHECK (status IN ('SAVED', 'APPLIED', 'INTERESTED')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  PRIMARY KEY (user_id, opportunity_id)
);

-- 8. CVS (Resumes)
CREATE TABLE IF NOT EXISTS public.cvs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  title TEXT DEFAULT 'My CV',
  content JSONB, -- Structured CV data
  pdf_url TEXT, -- Link to storage if saved
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 9. APPLICATIONS (New - Tracking user applications)
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  opportunity_id UUID REFERENCES public.opportunities(id),
  status TEXT DEFAULT 'APPLIED',
  notes TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 10. MENTORSHIP SESSIONS
CREATE TABLE IF NOT EXISTS public.mentorship_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  mentor_id UUID REFERENCES public.mentors(id),
  mentee_id UUID REFERENCES public.profiles(id),
  status TEXT CHECK (status IN ('PENDING', 'ACCEPTED', 'COMPLETED', 'CANCELLED')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 11. MENTOR REVIEWS (Ratings & comments for mentors)
CREATE TABLE IF NOT EXISTS public.mentor_reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  mentor_id UUID REFERENCES public.mentors(id),
  user_id UUID REFERENCES public.profiles(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. MENTOR REQUESTS (Mentee requests to connect with a mentor)
CREATE TABLE IF NOT EXISTS public.mentor_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  mentor_id UUID REFERENCES public.mentors(id),
  user_id UUID REFERENCES public.profiles(id),
  status TEXT CHECK (status IN ('PENDING', 'ACCEPTED', 'DECLINED')) DEFAULT 'PENDING',
  message TEXT,
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. MENTOR AVAILABILITY (Time slots when a mentor is available)
CREATE TABLE IF NOT EXISTS public.mentor_availability (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  mentor_id UUID REFERENCES public.mentors(id),
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  is_recurring BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 14. CHAT LOGS (For AI Improvement)
CREATE TABLE IF NOT EXISTS public.chat_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  messages JSONB, -- Array of message objects
  category TEXT, -- "CAREER", "CV_HELP", etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 15. WHATSAPP SESSIONS (State Machine)
CREATE TABLE IF NOT EXISTS public.whatsapp_sessions (
  phone_number TEXT PRIMARY KEY,
  state JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 16. NOTIFICATIONS (New)
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  type TEXT, -- e.g. 'APPLICATION_UPDATE', 'MENTOR_REQUEST'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 17. USER FEEDBACK (New)
CREATE TABLE IF NOT EXISTS public.user_feedback (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  rating INTEGER,
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- ====================
-- RLS POLICIES
-- ====================

-- PROFILES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

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

-- CAREERS
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public careers are viewable by everyone." ON public.careers;
CREATE POLICY "Public careers are viewable by everyone."
  ON public.careers FOR SELECT
  USING ( true );

-- WHATSAPP SESSIONS (Simplified for Bot access)
ALTER TABLE public.whatsapp_sessions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Bot can access sessions" ON public.whatsapp_sessions;
CREATE POLICY "Bot can access sessions" ON public.whatsapp_sessions FOR ALL USING (true);

-- APPLICATIONS
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own applications" ON public.applications;
CREATE POLICY "Users can view their own applications"
  ON public.applications FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own applications" ON public.applications;
CREATE POLICY "Users can insert their own applications"
  ON public.applications FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own applications" ON public.applications;
CREATE POLICY "Users can update their own applications"
  ON public.applications FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own applications" ON public.applications;
CREATE POLICY "Users can delete their own applications"
  ON public.applications FOR DELETE USING (auth.uid() = user_id);

-- NOTIFICATIONS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their notifications" ON public.notifications;
CREATE POLICY "Users can view their notifications"
  ON public.notifications FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert notifications" ON public.notifications;
CREATE POLICY "Users can insert notifications"
  ON public.notifications FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their notifications" ON public.notifications;
CREATE POLICY "Users can update their notifications"
  ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their notifications" ON public.notifications;
CREATE POLICY "Users can delete their notifications"
  ON public.notifications FOR DELETE USING (auth.uid() = user_id);

-- USER FEEDBACK
ALTER TABLE public.user_feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their feedback" ON public.user_feedback;
CREATE POLICY "Users can view their feedback"
  ON public.user_feedback FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert feedback" ON public.user_feedback;
CREATE POLICY "Users can insert feedback"
  ON public.user_feedback FOR INSERT WITH CHECK (auth.uid() = user_id);

-- MENTOR_REVIEWS
ALTER TABLE public.mentor_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view reviews" ON public.mentor_reviews;
CREATE POLICY "Users can view reviews"
  ON public.mentor_reviews FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own mentor reviews" ON public.mentor_reviews;
CREATE POLICY "Users can insert their own mentor reviews"
  ON public.mentor_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own mentor reviews" ON public.mentor_reviews;
CREATE POLICY "Users can update their own mentor reviews"
  ON public.mentor_reviews FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own mentor reviews" ON public.mentor_reviews;
CREATE POLICY "Users can delete their own mentor reviews"
  ON public.mentor_reviews FOR DELETE USING (auth.uid() = user_id);

-- MENTOR_REQUESTS
ALTER TABLE public.mentor_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own mentor requests" ON public.mentor_requests;
CREATE POLICY "Users can view their own mentor requests"
  ON public.mentor_requests FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own mentor requests" ON public.mentor_requests;
CREATE POLICY "Users can insert their own mentor requests"
  ON public.mentor_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own mentor requests" ON public.mentor_requests;
CREATE POLICY "Users can update their own mentor requests"
  ON public.mentor_requests FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own mentor requests" ON public.mentor_requests;
CREATE POLICY "Users can delete their own mentor requests"
  ON public.mentor_requests FOR DELETE USING (auth.uid() = user_id);

-- MENTOR_AVAILABILITY
ALTER TABLE public.mentor_availability ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own availability" ON public.mentor_availability;
CREATE POLICY "Users can view their own availability"
  ON public.mentor_availability FOR SELECT USING (auth.uid() = mentor_id);

DROP POLICY IF EXISTS "Users can insert their own availability" ON public.mentor_availability;
CREATE POLICY "Users can insert their own availability"
  ON public.mentor_availability FOR INSERT WITH CHECK (auth.uid() = mentor_id);

DROP POLICY IF EXISTS "Users can update their own availability" ON public.mentor_availability;
CREATE POLICY "Users can update their own availability"
  ON public.mentor_availability FOR UPDATE USING (auth.uid() = mentor_id) WITH CHECK (auth.uid() = mentor_id);

DROP POLICY IF EXISTS "Users can delete their own availability" ON public.mentor_availability;
CREATE POLICY "Users can delete their own availability"
  ON public.mentor_availability FOR DELETE USING (auth.uid() = mentor_id);

-- ROADMAPS
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own roadmaps" ON public.roadmaps;
CREATE POLICY "Users can view their own roadmaps"
  ON public.roadmaps FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own roadmaps" ON public.roadmaps;
CREATE POLICY "Users can insert their own roadmaps"
  ON public.roadmaps FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own roadmaps" ON public.roadmaps;
CREATE POLICY "Users can update their own roadmaps"
  ON public.roadmaps FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own roadmaps" ON public.roadmaps;
CREATE POLICY "Users can delete their own roadmaps"
  ON public.roadmaps FOR DELETE USING (auth.uid() = user_id);

-- ====================
-- INDEXES
-- ====================
CREATE INDEX IF NOT EXISTS idx_mentor_reviews_mentor_id ON public.mentor_reviews(mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentor_reviews_user_id ON public.mentor_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_mentor_requests_mentor_id ON public.mentor_requests(mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentor_requests_user_id ON public.mentor_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_mentor_availability_mentor_id ON public.mentor_availability(mentor_id);
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON public.applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_opportunity_id ON public.applications(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_user_feedback_user_id ON public.user_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_roadmaps_user_id ON public.roadmaps(user_id);
