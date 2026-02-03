import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Simulated database for current session (if needed, though mostly we use localStorage on frontend)
let mockRoadmaps: any[] = [];

// Get roadmaps
export async function GET(req: Request) {
    // In "No-Backend" mode, we return an empty array or the current session's mock data
    return NextResponse.json(mockRoadmaps);
}

// Save a new roadmap
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { career, title, overview, content } = body;

        const newRoadmap = {
            id: Math.random().toString(36).substr(2, 9),
            user_id: 'mock-user-123',
            career,
            title,
            overview,
            content,
            created_at: new Date().toISOString()
        };

        mockRoadmaps.unshift(newRoadmap);
        return NextResponse.json(newRoadmap);
    } catch (err: any) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// Delete a roadmap
export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    mockRoadmaps = mockRoadmaps.filter(r => r.id !== id);
    return NextResponse.json({ success: true });
}
