
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(req: Request) {
    try {
        // Authenticate User
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const token = authHeader.replace('Bearer ', '');
        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
            global: { headers: { Authorization: `Bearer ${token}` } }
        });

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return new Response(JSON.stringify({ error: 'Unauthorized', details: authError }), { status: 401 });
        }

        // Fetch user's roadmaps
        const { data: roadmaps, error: dbError } = await supabase
            .from('roadmaps')
            .select('*')
            .order('created_at', { ascending: false });

        if (dbError) {
            throw dbError;
        }

        return new Response(JSON.stringify(roadmaps), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        // Authenticate User
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const token = authHeader.replace('Bearer ', '');
        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
            global: { headers: { Authorization: `Bearer ${token}` } }
        });

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        // Parse body
        const body = await req.json();
        const { career, title, overview, phases } = body;

        if (!career || !title || !phases) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
        }

        // Insert roadmap
        const { data, error: insertError } = await supabase
            .from('roadmaps')
            .insert({
                user_id: user.id,
                career,
                title,
                overview,
                phases
            })
            .select()
            .single();

        if (insertError) {
            throw insertError;
        }

        return new Response(JSON.stringify(data), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error("Error saving roadmap:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

        const token = authHeader.replace('Bearer ', '');
        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
            global: { headers: { Authorization: `Bearer ${token}` } }
        });

        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

        const url = new URL(req.url);
        const id = url.searchParams.get('id');

        if (!id) return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });

        const { error: deleteError } = await supabase
            .from('roadmaps')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id); // Extra safety check

        if (deleteError) throw deleteError;

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
