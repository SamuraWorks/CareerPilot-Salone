import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV,
        region: process.env.VERCEL_REGION || 'local'
    }, { status: 200 });
}
