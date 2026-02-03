-- Create feedback table for bug reports and feature requests
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    message TEXT NOT NULL,
    email TEXT,
    type TEXT DEFAULT 'general',
    status TEXT DEFAULT 'new', -- new, reviews, closed
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (including anonymous users)
CREATE POLICY "Enable insert for everyone" ON public.feedback
    FOR INSERT
    WITH CHECK (true);

-- Allow admins (authenticated with service role or specific claim) to read
-- For now, we'll allow authenticated users to read their own feedback if profile_id matches
CREATE POLICY "Enable read for owners" ON public.feedback
    FOR SELECT
    USING (auth.uid() = profile_id);
