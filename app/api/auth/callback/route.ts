import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { origin } = new URL(request.url)
    const next = '/dashboard'

    // Mock successful auth
    return NextResponse.redirect(`${origin}${next}`)
}
