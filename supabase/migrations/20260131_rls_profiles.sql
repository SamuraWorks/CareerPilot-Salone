-- CareerPilot Salone: Consolidated Production Core Schema
-- Target: High Security, Scalable, UUID-based Identity

-- 1. PROFILES TABLE
-- Every user MUST use Supabase Auth UUID as their global identity.
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  phone_number text,
  district text,
  location text, -- Legacy alias for district
  education_level text,
  career_goal text,
  interests jsonb DEFAULT '[]'::jsonb,
  skills jsonb DEFAULT '[]'::jsonb,
  is_complete boolean DEFAULT false,
  role text DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  points integer DEFAULT 0,
  created_at timestamp WITH time zone DEFAULT now(),
  updated_at timestamp WITH time zone DEFAULT now()
);

-- 2. PROGRESS TRACKING
CREATE TABLE IF NOT EXISTS public.progress_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  current_stage text NOT NULL,
  completed_steps jsonb DEFAULT '[]'::jsonb,
  updated_at timestamp WITH time zone DEFAULT now(),
  UNIQUE(user_id)
);

-- 3. AI SESSIONS
CREATE TABLE IF NOT EXISTS public.ai_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  session_type text NOT NULL,
  created_at timestamp WITH time zone DEFAULT now()
);

-- 4. RECOMMENDATIONS
CREATE TABLE IF NOT EXISTS public.recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  careers jsonb DEFAULT '[]'::jsonb,
  scholarships jsonb DEFAULT '[]'::jsonb,
  jobs jsonb DEFAULT '[]'::jsonb,
  skills jsonb DEFAULT '[]'::jsonb,
  roadmap_summary text,
  generated_at timestamp WITH time zone DEFAULT now(),
  updated_at timestamp WITH time zone DEFAULT now(),
  UNIQUE(user_id)
);

-- 5. SCHOLARSHIPS
CREATE TABLE IF NOT EXISTS public.scholarships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  organization text NOT NULL,
  description text,
  education_level jsonb DEFAULT '[]'::jsonb,
  field text,
  deadline text,
  status text CHECK (status IN ('open', 'closing_soon', 'closed')) DEFAULT 'open',
  official_link text,
  last_verified_at timestamp WITH time zone DEFAULT now(),
  created_at timestamp WITH time zone DEFAULT now(),
  updated_at timestamp WITH time zone DEFAULT now()
);

-- 6. ROW LEVEL SECURITY (STRICT MODE)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;

-- 7. POLICIES: PROFILES
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- 8. POLICIES: PROGRESS TRACKING
CREATE POLICY "Users can view own progress" ON public.progress_tracking FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON public.progress_tracking FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.progress_tracking FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all progress" ON public.progress_tracking FOR SELECT USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- 9. POLICIES: AI SESSIONS
CREATE POLICY "Users can view own AI sessions" ON public.ai_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own AI sessions" ON public.ai_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all AI sessions" ON public.ai_sessions FOR SELECT USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- 10. POLICIES: RECOMMENDATIONS
CREATE POLICY "Users can view own recommendations" ON public.recommendations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own recommendations" ON public.recommendations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all recommendations" ON public.recommendations FOR SELECT USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- 11. POLICIES: SCHOLARSHIPS
CREATE POLICY "Everyone can view scholarships" ON public.scholarships FOR SELECT USING (true);
CREATE POLICY "Admins can manage scholarships" ON public.scholarships FOR ALL USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- 12. AUTOMATIC PROFILE CREATION
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 13. UPDATED AT TRIGGER
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_recommendations_updated_at BEFORE UPDATE ON recommendations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_scholarships_updated_at BEFORE UPDATE ON scholarships FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
