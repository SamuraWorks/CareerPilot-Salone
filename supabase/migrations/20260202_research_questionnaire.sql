-- Create research_entries table
CREATE TABLE IF NOT EXISTS public.research_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    anon_id TEXT, -- For redundancy/searching
    sector_interest TEXT,
    highest_education TEXT,
    skills TEXT[],
    career_goals TEXT,
    opportunities_interest TEXT[], -- scholarships, internships, jobs
    wants_recommendations BOOLEAN DEFAULT true,
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add research_completed flag to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS research_completed BOOLEAN DEFAULT false;

-- Enable RLS
ALTER TABLE public.research_entries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for research_entries

-- Allow anonymous users to select their own entries (based on anon_id)
CREATE POLICY "Enable read access for owners" ON public.research_entries
    FOR SELECT
    USING (
        (auth.uid() = profile_id) OR 
        (anon_id IS NOT NULL AND anon_id = current_setting('request.headers', true)::json->>'x-anon-id')
    );

-- Allow anonymous users to insert
CREATE POLICY "Enable insert access for all" ON public.research_entries
    FOR INSERT
    WITH CHECK (true);

-- Allow owners to update
CREATE POLICY "Enable update access for owners" ON public.research_entries
    FOR UPDATE
    USING (
        (auth.uid() = profile_id) OR 
        (anon_id IS NOT NULL AND anon_id = current_setting('request.headers', true)::json->>'x-anon-id')
    );
