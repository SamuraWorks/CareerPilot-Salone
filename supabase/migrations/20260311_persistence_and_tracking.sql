-- Migration: Add user_documents and activity_logs
-- For CareerPilot persistent storage and activity tracking

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

-- Enable RLS
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_documents
DROP POLICY IF EXISTS "Users can manage own documents" ON public.user_documents;
CREATE POLICY "Users can manage own documents" ON public.user_documents 
    FOR ALL TO public 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- RLS Policies for activity_logs
DROP POLICY IF EXISTS "Users can view own activity" ON public.activity_logs;
CREATE POLICY "Users can view own activity" ON public.activity_logs 
    FOR SELECT TO public USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anyone can log activity" ON public.activity_logs;
CREATE POLICY "Anyone can log activity" ON public.activity_logs 
    FOR INSERT TO public WITH CHECK (true);

-- Trigger for updated_at in user_documents
DROP TRIGGER IF EXISTS update_user_documents_updated_at ON public.user_documents;
CREATE TRIGGER update_user_documents_updated_at BEFORE UPDATE ON public.user_documents FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
