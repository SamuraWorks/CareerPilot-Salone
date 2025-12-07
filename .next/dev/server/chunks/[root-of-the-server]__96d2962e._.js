module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/api/roadmaps/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$esm$2f$wrapper$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/@supabase/supabase-js/dist/esm/wrapper.mjs [app-route] (ecmascript)");
;
// Initialize Supabase client
const supabaseUrl = ("TURBOPACK compile-time value", "https://qfmkkoswhhasbwvgcszb.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmbWtrb3N3aGhhc2J3dmdjc3piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NjkxMDAsImV4cCI6MjA4MDU0NTEwMH0.0szbkGML0d8xhIpMukVMyhmawqweEhSf3UM0P0UECTk");
async function GET(req) {
    try {
        // Authenticate User
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return new Response(JSON.stringify({
                error: 'Unauthorized'
            }), {
                status: 401
            });
        }
        const token = authHeader.replace('Bearer ', '');
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$esm$2f$wrapper$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])(supabaseUrl, supabaseAnonKey, {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        });
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return new Response(JSON.stringify({
                error: 'Unauthorized',
                details: authError
            }), {
                status: 401
            });
        }
        // Fetch user's roadmaps
        const { data: roadmaps, error: dbError } = await supabase.from('roadmaps').select('*').order('created_at', {
            ascending: false
        });
        if (dbError) {
            throw dbError;
        }
        return new Response(JSON.stringify(roadmaps), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({
            error: error.message
        }), {
            status: 500
        });
    }
}
async function POST(req) {
    try {
        // Authenticate User
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return new Response(JSON.stringify({
                error: 'Unauthorized'
            }), {
                status: 401
            });
        }
        const token = authHeader.replace('Bearer ', '');
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$esm$2f$wrapper$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])(supabaseUrl, supabaseAnonKey, {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        });
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return new Response(JSON.stringify({
                error: 'Unauthorized'
            }), {
                status: 401
            });
        }
        // Parse body
        const body = await req.json();
        const { career, title, overview, phases } = body;
        if (!career || !title || !phases) {
            return new Response(JSON.stringify({
                error: 'Missing required fields'
            }), {
                status: 400
            });
        }
        // Insert roadmap
        const { data, error: insertError } = await supabase.from('roadmaps').insert({
            user_id: user.id,
            career,
            title,
            overview,
            phases
        }).select().single();
        if (insertError) {
            throw insertError;
        }
        return new Response(JSON.stringify(data), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error saving roadmap:", error);
        return new Response(JSON.stringify({
            error: error.message
        }), {
            status: 500
        });
    }
}
async function DELETE(req) {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) return new Response(JSON.stringify({
            error: 'Unauthorized'
        }), {
            status: 401
        });
        const token = authHeader.replace('Bearer ', '');
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$esm$2f$wrapper$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])(supabaseUrl, supabaseAnonKey, {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        });
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) return new Response(JSON.stringify({
            error: 'Unauthorized'
        }), {
            status: 401
        });
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        if (!id) return new Response(JSON.stringify({
            error: 'ID is required'
        }), {
            status: 400
        });
        const { error: deleteError } = await supabase.from('roadmaps').delete().eq('id', id).eq('user_id', user.id); // Extra safety check
        if (deleteError) throw deleteError;
        return new Response(JSON.stringify({
            success: true
        }), {
            status: 200
        });
    } catch (error) {
        return new Response(JSON.stringify({
            error: error.message
        }), {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__96d2962e._.js.map